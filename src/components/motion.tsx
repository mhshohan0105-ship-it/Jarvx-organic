'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { bn } from '@/lib/format';
import { reduceMotion } from '@/lib/motion';

// Headline whose words rise in one by one when scrolled into view.
// Plain text is split per word; any element child (rotator, highlight) moves as one word.
export function Split({ as: Tag = 'h2', className = '', children, ...rest }: { as?: ElementType; className?: string; children: ReactNode; [k: string]: unknown }) {
    let i = 0;
    const out: ReactNode[] = [];
    const word = (node: ReactNode, key: string) => out.push(
        <span className="word" key={key}><span style={{ transitionDelay: `${(i++ * 0.06).toFixed(2)}s` }}>{node}</span></span>
    );
    Children.forEach(children, (child, ci) => {
        if (typeof child === 'string' || typeof child === 'number') {
            String(child).split(/(\s+)/).forEach((part, pi) => {
                if (!part) return;
                if (/^\s+$/.test(part)) out.push(part);
                else word(part, `${ci}-${pi}`);
            });
        } else if (isValidElement(child) && child.type === 'br') {
            out.push(cloneElement(child, { key: ci }));
        } else if (child != null && child !== false) {
            word(child, String(ci));
        }
    });
    return <Tag className={`split ${className}`} {...rest}>{out}</Tag>;
}

// Rotating words: cycles through `words` every 2.2s.
// `className` goes on each word, not the wrapper: a background-clip:text gradient on the
// wrapper would paint every word's glyphs, ignoring the hidden words' opacity.
export function Rotator({ words, className = '' }: { words: string[]; className?: string }) {
    const [cur, setCur] = useState(0);
    const [prev, setPrev] = useState(-1);
    useEffect(() => {
        if (reduceMotion() || words.length < 2) return;
        const t = setInterval(() => setCur(c => { setPrev(c); return (c + 1) % words.length; }), 2200);
        return () => clearInterval(t);
    }, [words.length]);
    return (
        <span className="rotator">
            {words.map((w, i) => <span key={w} className={`${className} ${i === cur ? 'on' : i === prev ? 'off' : ''}`}>{w}</span>)}
        </span>
    );
}

// Falling leaf particles for dark hero sections (generated client-side to keep SSR deterministic)
export function Leaves({ n = 6 }: { n?: number }) {
    const [leaves, setLeaves] = useState<CSSProperties[]>([]);
    useEffect(() => {
        if (reduceMotion()) return;
        setLeaves(Array.from({ length: n }, () => ({
            left: `${Math.random() * 100}%`, top: 0, fontSize: `${10 + Math.random() * 14}px`,
            animationDuration: `${12 + Math.random() * 14}s`, animationDelay: `${-Math.random() * 20}s`,
        })));
    }, [n]);
    return <>{leaves.map((s, i) => <i key={i} className="fa-solid fa-leaf leaf-particle" style={s}></i>)}</>;
}

// Number that counts up (in Bangla digits) once it scrolls into view
export function CountUp({ to }: { to: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (reduceMotion() || !('IntersectionObserver' in window)) { setValue(to); return; }
        let raf = 0;
        const io = new IntersectionObserver(([en]) => {
            if (!en.isIntersecting) return;
            io.disconnect();
            const start = performance.now();
            const step = (now: number) => {
                const k = Math.min(1, (now - start) / 1800);
                setValue(Math.floor(to * (1 - Math.pow(1 - k, 4))));
                if (k < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, { threshold: 0.12 });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, [to]);
    return <span ref={ref}>{bn(value.toLocaleString('en-IN'))}</span>;
}

// Smoothly tween a displayed number toward `target`
export function useAnimatedNumber(target: number, duration = 500) {
    const [shown, setShown] = useState(target);
    const from = useRef(0);
    useEffect(() => {
        const start = performance.now(), origin = from.current;
        from.current = target;
        let raf = 0;
        const step = (now: number) => {
            const k = Math.min(1, (now - start) / duration);
            setShown(origin + (target - origin) * (1 - Math.pow(1 - k, 3)));
            if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return shown;
}
