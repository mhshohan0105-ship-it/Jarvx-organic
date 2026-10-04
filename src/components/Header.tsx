'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { bn } from '@/lib/format';
import { navigateWithCurtain } from '@/lib/motion';
import { useShop } from './ShopProvider';
import { LogoMark } from './ui';

export const NAV = [
    { href: '/',            label: 'হোম' },
    { href: '/products',    label: 'পণ্যসমূহ' },
    { href: '/package',     label: 'প্যাকেজ' },
    { href: '/lab-reports', label: 'ল্যাব রিপোর্ট' },
    { href: '/about',       label: 'আমাদের গল্প' },
    { href: '/reviews',     label: 'রিভিউ' },
    { href: '/contact',     label: 'যোগাযোগ' },
];

// The products page listens for this to clear its search box
export const SEARCH_EVENT = 'jv:search';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { count, wishlist } = useShop();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');
    const onProducts = pathname === '/products';

    useEffect(() => {
        setOpen(false);
        setQ(new URLSearchParams(location.search).get('q') || '');
    }, [pathname]);

    useEffect(() => {
        const sync = (e: Event) => setQ((e as CustomEvent<string>).detail);
        addEventListener(SEARCH_EVENT, sync);
        return () => removeEventListener(SEARCH_EVENT, sync);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open) return;
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        addEventListener('keydown', esc);
        return () => removeEventListener('keydown', esc);
    }, [open]);

    // On the products page, typing filters live by updating ?q= in place
    function liveSearch(value: string) {
        setQ(value);
        if (!onProducts) return;
        const params = new URLSearchParams(location.search);
        if (value) params.set('q', value); else params.delete('q');
        history.replaceState(null, '', '/products' + (params.toString() ? '?' + params : ''));
    }

    function submitSearch(e: FormEvent) {
        e.preventDefault();
        const term = q.trim();
        if (onProducts) return setOpen(false);
        navigateWithCurtain(router, '/products' + (term ? '?q=' + encodeURIComponent(term) : ''));
    }

    const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <>
            <div id="siteHeader" className="site-header fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4 px-2 sm:px-5">
                <div className="header-shell max-w-7xl mx-auto rounded-full bg-leaf-950/60 backdrop-blur-xl border border-white/10 text-white pl-2.5 pr-1.5 sm:pl-5 sm:pr-2 h-16 flex items-center justify-between gap-2 sm:gap-3">
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                        <span className="group-hover:rotate-[-8deg] transition-transform duration-500"><LogoMark /></span>
                        <span className="font-brand font-extrabold text-base sm:text-xl tracking-tight leading-none">JavrVX<span className="text-lime-500 hidden min-[420px]:inline"> Organic</span></span>
                    </Link>
                    <nav className="hidden xl:flex items-center gap-6 text-sm text-white/75 font-medium">
                        {NAV.map(n => <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'active' : ''}`}>{n.label}</Link>)}
                    </nav>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <form onSubmit={submitSearch} className="relative hidden md:block group">
                            <input type="search" value={q} onChange={e => liveSearch(e.target.value)} placeholder="খুঁজুন..."
                                className="search-input w-36 focus:w-56 transition-all duration-500 bg-white/10 text-xs text-white placeholder-white/50 rounded-full py-2.5 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-white/10" />
                            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-xs text-white/60"></i>
                        </form>
                        <Link href="/wishlist" aria-label="পছন্দের তালিকা" className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors ${pathname === '/wishlist' ? 'text-lime-500' : 'text-white/80'}`}>
                            <i className="fa-regular fa-heart text-lg"></i>
                            <span className="absolute top-1 right-1 bg-gold-500 text-leaf-950 text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">{bn(wishlist.length)}</span>
                        </Link>
                        <Link href="/cart" id="cartIcon" aria-label="কার্ট" className="relative h-10 sm:h-11 pl-3 pr-2 sm:pl-4 sm:pr-3 bg-lime-500 hover:bg-white text-leaf-950 rounded-full transition-colors flex items-center gap-2 font-bold text-sm">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="bg-leaf-950 text-lime-500 text-[11px] min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center">{bn(count)}</span>
                        </Link>
                        <button onClick={() => setOpen(o => !o)} aria-label="মেনু" className="xl:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-white/10 flex items-center justify-center relative z-[60]">
                            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars-staggered'} text-lg`}></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="mobileMenu" className={`fixed inset-0 z-[55] mesh-bg grain xl:hidden flex flex-col justify-center px-8 ${open ? 'open' : 'pointer-events-none'}`}>
                <form onSubmit={submitSearch} className="relative mb-8 md:hidden">
                    <input type="search" value={q} onChange={e => liveSearch(e.target.value)} placeholder="পণ্য খুঁজুন..." className="search-input w-full bg-white/10 text-white placeholder-white/50 rounded-full py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-white/10" />
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-4 text-white/60"></i>
                </form>
                {NAV.map((n, i) => (
                    <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`m-link block font-display text-4xl font-bold py-2 ${isActive(n.href) ? 'text-lime-500' : 'text-white hover:text-lime-500'}`} style={{ transitionDelay: `${0.15 + i * 0.05}s` }}>{n.label}</Link>
                ))}
                <p className="text-white/50 text-sm mt-10"><i className="fa-solid fa-phone mr-2 text-lime-500"></i>০১৭০০-০০০০০০</p>
            </div>
        </>
    );
}
