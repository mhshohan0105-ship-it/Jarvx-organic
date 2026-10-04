import Link from 'next/link';
import type { Review } from '@/lib/data';
import { findProduct } from '@/lib/format';
import { Leaves, Split } from './motion';

export function LogoMark({ size = 'w-10 h-10', text = 'text-xl' }: { size?: string; text?: string }) {
    return (
        <span className={`relative ${size} rounded-2xl bg-lime-500 flex items-center justify-center shadow-lg shadow-lime-500/20 overflow-hidden`}>
            <i className={`fa-solid fa-seedling ${text} text-leaf-900 relative z-10`}></i>
            <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gold-500"></span>
        </span>
    );
}

// Dark hero banner at the top of every inner page
export function PageBanner({ title, sub, crumb, icon }: { title: string; sub?: string; crumb?: string; icon?: string }) {
    return (
        <section className="relative mesh-bg grain text-white pt-36 pb-24 sm:pt-44 sm:pb-28 overflow-hidden">
            <Leaves n={8} />
            <div className="blob w-80 h-80 bg-lime-500/40 -top-20 -left-20 animate-blob"></div>
            <div className="blob w-96 h-96 bg-gold-500/40 -bottom-40 right-0 animate-blob" style={{ animationDelay: '-6s' }}></div>
            {icon && <i className={`fa-solid ${icon} absolute right-[6%] top-1/2 -translate-y-1/2 text-[180px] sm:text-[260px] text-white/[0.04] animate-float-slow hidden sm:block`}></i>}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <nav data-reveal="up" className="inline-flex items-center gap-2 text-xs text-white/60 glass rounded-full px-4 py-2 mb-6">
                    <Link href="/" className="hover:text-lime-500"><i className="fa-solid fa-house"></i> হোম</Link>
                    <i className="fa-solid fa-chevron-right text-[8px] opacity-60"></i>
                    <span className="text-lime-500">{crumb || title}</span>
                </nav>
                <Split as="h1" className="font-bold text-4xl sm:text-6xl leading-[1.1] max-w-4xl">{title}</Split>
                {sub && <p data-reveal="up" style={{ '--d': '.35s' } as React.CSSProperties} className="text-white/70 text-base sm:text-lg mt-5 max-w-2xl">{sub}</p>}
            </div>
            <svg className="wave-divider absolute bottom-0 inset-x-0" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="#F7F4EC" d="M0,40 C240,80 480,0 720,20 C960,40 1200,70 1440,30 L1440,60 L0,60 Z" /></svg>
        </section>
    );
}

export function ReviewCard({ r, marquee = false }: { r: Review; marquee?: boolean }) {
    const p = findProduct(r.product);
    return (
        <div className={`${marquee ? 'w-[320px] sm:w-[380px] shrink-0' : ''} bg-white p-6 rounded-4xl border border-leaf-900/5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-500`} {...(marquee ? {} : { 'data-reveal': 'up' })}>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex text-gold-500 text-xs gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <i key={i} className={`fa-${i <= r.rating ? 'solid' : 'regular'} fa-star`}></i>)}
                    </div>
                    <i className="fa-solid fa-quote-right text-2xl text-lime-500"></i>
                </div>
                <p className="text-leaf-950/80 text-[15px] leading-relaxed mt-3">{r.text}</p>
                {p && <Link href={`/products/${p.id}`} className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-semibold text-leaf-700 bg-leaf-50 px-3 py-1 rounded-full hover:bg-lime-500 hover:text-leaf-950 transition-colors"><i className="fa-solid fa-tag"></i>{p.name} · {p.weight}</Link>}
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-leaf-900/5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-leaf-700 to-leaf-900 text-lime-500 font-bold flex items-center justify-center">{r.name[0]}</div>
                <div>
                    <p className="text-sm font-bold text-leaf-950">{r.name}</p>
                    <p className="text-[11px] text-leaf-900/50">{r.loc} · <i className="fa-solid fa-circle-check text-leaf-600"></i> ভেরিফাইড</p>
                </div>
            </div>
        </div>
    );
}

export const delay = (d: number | string) => ({ '--d': typeof d === 'number' ? `${d}s` : d } as React.CSSProperties);
