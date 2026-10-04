'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { productsData, type Product } from '@/lib/data';
import { bn, categoryLabel, taka } from '@/lib/format';
import { flyToCart, navigateWithCurtain } from '@/lib/motion';
import { Split } from '../motion';
import { WishButton } from '../ProductCard';
import { useShop } from '../ShopProvider';
import { delay } from '../ui';

const TABS = ['বিস্তারিত', 'উপকারিতা', 'ডেলিভারি'];

function variantLabel(v: Product) {
    const m = v.en.match(/\(([^)]+)\)$/);
    return v.weight + (m ? ' · ' + m[1] : '');
}

export default function ProductDetail({ product: p }: { product: Product }) {
    const router = useRouter();
    const { add } = useShop();
    const [qty, setQty] = useState(1);
    const [tab, setTab] = useState(0);
    const [shownTab, setShownTab] = useState(0);
    const [barVisible, setBarVisible] = useState(false);
    const mainImg = useRef<HTMLImageElement>(null);
    const barImg = useRef<HTMLImageElement>(null);
    const priceRef = useRef<HTMLSpanElement>(null);
    const qtyRef = useRef<HTMLSpanElement>(null);
    const variants = productsData.filter(v => v.group === p.group);

    // Sticky buy bar appears once the main price has scrolled past
    useEffect(() => {
        const el = priceRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([en]) => setBarVisible(!en.isIntersecting && en.boundingClientRect.top <= 0));
        io.observe(el);
        return () => io.disconnect();
    }, []);

    function selectTab(i: number) {
        setTab(i);
        setTimeout(() => setShownTab(i), 150);
    }

    function stepQty(d: number) {
        setQty(q => Math.max(1, q + d));
        qtyRef.current?.animate?.([{ transform: `translateY(${d > 0 ? -8 : 8}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 250 });
    }

    const addMain = (from: HTMLImageElement | null) => flyToCart(from, () => add(p.id, qty));
    const buyNow = () => { add(p.id, qty, true); navigateWithCurtain(router, '/checkout'); };

    const bodies = [
        <p key="d">{p.details || p.description}</p>,
        <ul key="b" className="space-y-3">{(p.benefits || []).map((b, i) => <li key={b} className="flex items-center gap-3" style={{ animation: `logo-pop .5s ${i * 0.08}s both` }}><span className="w-7 h-7 rounded-full bg-lime-500 text-leaf-950 flex items-center justify-center text-xs"><i className="fa-solid fa-check"></i></span>{b}</li>)}</ul>,
        <ul key="v" className="space-y-3">
            <li className="flex gap-3"><i className="fa-solid fa-truck text-leaf-600 mt-1"></i>ঢাকার ভিতরে ২৪ ঘণ্টায় ডেলিভারি — চার্জ ৳৬০</li>
            <li className="flex gap-3"><i className="fa-solid fa-map-location-dot text-leaf-600 mt-1"></i>ঢাকার বাইরে ২-৩ দিনে — চার্জ ৳১২০</li>
            <li className="flex gap-3"><i className="fa-solid fa-hand-holding-dollar text-leaf-600 mt-1"></i>পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন</li>
        </ul>,
    ];

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div data-reveal="zoom" className="relative lg:sticky lg:top-28" data-depth-root>
                    <div className="absolute inset-6 rounded-full bg-gradient-to-br from-gold-300 to-lime-400 blur-2xl opacity-60 animate-blob"></div>
                    <div data-depth="0.25" className="relative rounded-5xl overflow-hidden aspect-square bg-white shadow-2xl shadow-leaf-900/20 transition-[translate] duration-300 ease-out">
                        <img ref={mainImg} src={p.image.replace('w=600', 'w=1000')} alt={p.en} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <span data-depth="0.7" className="absolute -top-3 -left-3 sm:top-6 sm:-left-6 bg-lime-500 text-leaf-950 font-bold text-sm px-5 py-2.5 rounded-full shadow-xl animate-float transition-[translate] duration-300 ease-out">{p.tag}</span>
                    <div data-depth="0.9" className="absolute -bottom-5 right-4 sm:-right-6 glass-light rounded-3xl px-5 py-3 shadow-xl flex items-center gap-3 animate-float-slow transition-[translate] duration-300 ease-out">
                        <span className="relative w-10 h-10 rounded-full bg-leaf-900 text-lime-500 flex items-center justify-center ring-pulse"><i className="fa-solid fa-shield-halved"></i></span>
                        <div><p className="text-[10px] text-leaf-900/60 font-bold uppercase">ল্যাব টেস্টেড</p><p className="text-sm font-bold text-leaf-950">১০০% খাঁটি</p></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <Link data-reveal="up" href={`/products?cat=${p.category}`} className="eyebrow bg-leaf-900/5 text-leaf-700 hover:bg-lime-500 hover:text-leaf-950 transition-colors">{categoryLabel(p.category)}</Link>
                        <Split as="h1" className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4 leading-tight">{p.name}</Split>
                        <p data-reveal="up" style={delay(.2)} className="text-leaf-900/40 font-brand mt-2">{p.en}</p>
                    </div>

                    <div data-reveal="up" style={delay(.25)} className="flex items-end gap-3">
                        <span ref={priceRef} className="font-display font-extrabold text-5xl text-leaf-950">{taka(p.price)}</span>
                        <span className="text-leaf-900/50 mb-2">/ {p.weight}</span>
                    </div>

                    {variants.length > 1 && (
                        <div data-reveal="up" style={delay(.3)}>
                            <p className="text-xs font-bold text-leaf-900/60 uppercase tracking-wider mb-3">সাইজ / ভ্যারিয়েন্ট বেছে নিন</p>
                            <div className="flex flex-wrap gap-2">
                                {variants.map(v => (
                                    <Link key={v.id} href={`/products/${v.id}`} className={`group px-4 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-300 ${v.id === p.id
                                        ? 'bg-leaf-900 text-lime-500 border-leaf-900 shadow-lg'
                                        : 'bg-white text-leaf-900 border-leaf-900/10 hover:border-leaf-600 hover:-translate-y-0.5'}`}>
                                        {variantLabel(v)}<span className={`block text-xs ${v.id === p.id ? 'text-white/70' : 'text-leaf-900/50'}`}>{taka(v.price)}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div data-reveal="up" style={delay(.35)} className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-center bg-white rounded-full border-2 border-leaf-900/10 p-1">
                            <button onClick={() => stepQty(-1)} aria-label="কমান" className="w-11 h-11 rounded-full hover:bg-cream text-lg transition-colors">−</button>
                            <span ref={qtyRef} className="w-10 text-center font-display font-bold text-lg">{bn(qty)}</span>
                            <button onClick={() => stepQty(1)} aria-label="বাড়ান" className="w-11 h-11 rounded-full hover:bg-cream text-lg transition-colors">+</button>
                        </div>
                        <button onClick={() => addMain(mainImg.current)} data-magnetic className="btn btn-lime flex-1 min-w-[180px] px-6 py-4"><i className="fa-solid fa-bag-shopping"></i> কার্টে যোগ করুন</button>
                        <button onClick={buyNow} className="btn btn-dark flex-1 min-w-[150px] px-6 py-4">এখনই কিনুন <i className="fa-solid fa-arrow-right btn-icon"></i></button>
                        <WishButton id={p.id} className="w-14 h-14 rounded-full border-2 border-leaf-900/10 bg-white flex items-center justify-center text-xl hover:scale-110 transition-transform" />
                    </div>

                    <div data-reveal="up" style={delay(.4)} className="bg-white rounded-4xl border border-leaf-900/5 overflow-hidden">
                        <div className="relative flex border-b border-leaf-900/5">
                            {TABS.map((t, i) => <button key={t} onClick={() => selectTab(i)} className={`flex-1 py-4 text-sm font-bold transition-colors ${i === tab ? 'text-leaf-950' : 'text-leaf-900/40 hover:text-leaf-900'}`}>{t}</button>)}
                            <span className="absolute bottom-0 h-[3px] bg-lime-500 rounded-full transition-all duration-500" style={{ width: '33.33%', left: `${tab * 33.33}%` }}></span>
                        </div>
                        <div className="p-6 text-sm leading-relaxed text-leaf-900/80 min-h-[150px] transition-opacity duration-300" style={{ opacity: tab === shownTab ? 1 : 0 }}>{bodies[shownTab]}</div>
                    </div>

                    <div data-reveal="up" style={delay(.45)} className="grid grid-cols-3 gap-3">
                        {[['fa-vial-circle-check', 'ল্যাব টেস্টেড'], ['fa-truck-fast', 'ক্যাশ অন ডেলিভারি'], ['fa-rotate-left', 'সহজ রিটার্ন']].map(([i, t]) => (
                            <div key={t} className="group p-4 rounded-3xl bg-white border border-leaf-900/5 text-center hover:bg-leaf-900 transition-colors duration-500">
                                <i className={`fa-solid ${i} text-xl text-leaf-600 group-hover:text-lime-500 group-hover:scale-125 transition-all duration-500`}></i>
                                <p className="text-[11px] sm:text-xs font-bold text-leaf-900 group-hover:text-white mt-2 transition-colors">{t}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky buy bar */}
            <div className={`fixed bottom-0 inset-x-0 z-40 p-3 transition-transform duration-500 ${barVisible ? '' : 'translate-y-full'}`}>
                <div className="max-w-3xl mx-auto bg-leaf-950/95 backdrop-blur-xl text-white rounded-full pl-2 pr-2 py-2 flex items-center gap-3 shadow-2xl border border-white/10">
                    <img ref={barImg} src={p.image} alt="" className="w-11 h-11 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{p.name} · {p.weight}</p>
                        <p className="text-xs text-lime-500 font-bold">{taka(p.price)}</p>
                    </div>
                    <button onClick={() => addMain(barImg.current)} className="btn btn-lime px-5 py-3 text-sm"><i className="fa-solid fa-bag-shopping"></i><span className="hidden sm:inline">কার্টে যোগ</span></button>
                </div>
            </div>
        </>
    );
}
