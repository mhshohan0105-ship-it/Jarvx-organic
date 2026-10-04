'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { navigateWithCurtain, reduceMotion } from '@/lib/motion';

// Site-wide motion: reveal-on-scroll, 3D tilt, magnetic buttons, mouse depth,
// scroll progress / header / back-to-top / parallax, and curtain page transitions.
// Everything works through data-attributes so pages can stay declarative.
export default function MotionEngine() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Lift the curtain once the new route has rendered
    useEffect(() => {
        document.getElementById('pageCurtain')?.classList.remove('enter');
    }, [pathname, searchParams]);

    // Reveal on scroll: sets data-in (React never touches it, so re-renders keep the state)
    useEffect(() => {
        const selector = '[data-reveal]:not([data-in]), .split:not([data-in]), .underline-draw:not([data-in])';
        const seen = new WeakSet<Element>();
        const show = (el: Element) => el.setAttribute('data-in', '');
        const io = 'IntersectionObserver' in window && !reduceMotion() ? new IntersectionObserver(entries => entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io!.unobserve(el);
            const d = parseFloat(el.style.getPropertyValue('--d')) || 0;
            setTimeout(() => show(el), d * 1000);
        }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

        const scan = () => document.querySelectorAll(selector).forEach(el => {
            if (seen.has(el)) return;
            seen.add(el);
            if (io) io.observe(el); else show(el);
        });
        scan();
        let queued = false;
        const mo = new MutationObserver(() => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => { queued = false; scan(); });
        });
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { mo.disconnect(); io?.disconnect(); };
    }, []);

    // Pointer effects (delegated, so they work for re-rendered elements)
    useEffect(() => {
        if (!matchMedia('(pointer: fine)').matches || reduceMotion()) return;
        const move = (e: PointerEvent) => {
            const target = e.target as Element;
            const card = target.closest<HTMLElement>('[data-tilt]');
            if (card) {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
                card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
                card.style.setProperty('--gx', x * 100 + '%');
                card.style.setProperty('--gy', y * 100 + '%');
            }
            const m = target.closest<HTMLElement>('[data-magnetic]');
            if (m) {
                const r = m.getBoundingClientRect();
                m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
            }
            document.querySelectorAll<HTMLElement>('[data-depth-root]').forEach(root => {
                const r = root.getBoundingClientRect();
                if (e.clientY < r.top || e.clientY > r.bottom) return;
                const x = e.clientX / innerWidth - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
                root.querySelectorAll<HTMLElement>('[data-depth]').forEach(el => {
                    const d = +el.dataset.depth!;
                    el.style.translate = `${x * d * 60}px ${y * d * 60}px`;
                });
            });
        };
        const out = (e: PointerEvent) => {
            const target = e.target as Element, related = e.relatedTarget as Node | null;
            for (const sel of ['[data-tilt]', '[data-magnetic]']) {
                const el = target.closest<HTMLElement>(sel);
                if (el && !el.contains(related)) el.style.transform = '';
            }
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerout', out);
        return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', out); };
    }, []);

    // Scroll-driven effects
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            const y = scrollY;
            const max = document.documentElement.scrollHeight - innerHeight;
            const p = max > 0 ? y / max : 0;
            document.getElementById('scrollProgress')?.style.setProperty('transform', `scaleX(${p})`);
            document.getElementById('siteHeader')?.classList.toggle('scrolled', y > 40);
            const btt = document.getElementById('backToTop');
            if (btt) {
                const show = y > 500;
                btt.classList.toggle('opacity-0', !show);
                btt.classList.toggle('translate-y-4', !show);
                btt.classList.toggle('pointer-events-none', !show);
                document.getElementById('bttRing')?.setAttribute('stroke-dashoffset', String(138.2 * (1 - p)));
            }
            if (!reduceMotion()) document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
                const r = el.getBoundingClientRect();
                const offset = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.parallax!;
                el.style.transform = `translate3d(0, ${offset}px, 0)`;
            });
            ticking = false;
        };
        const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
        addEventListener('scroll', schedule, { passive: true });
        addEventListener('resize', schedule);
        onScroll();
        return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
    }, [pathname]);

    // Curtain transition for internal links (runs before next/link's own handler)
    useEffect(() => {
        const click = (e: MouseEvent) => {
            const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const href = a.getAttribute('href')!;
            if (a.target === '_blank' || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || a.hasAttribute('download')) return;
            const url = new URL(href, location.href);
            if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
            e.preventDefault();
            navigateWithCurtain(router, url.pathname + url.search + url.hash);
        };
        document.addEventListener('click', click, true);
        return () => document.removeEventListener('click', click, true);
    }, [router]);

    return null;
}
