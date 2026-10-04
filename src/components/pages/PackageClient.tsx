'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { BUNDLE_DISCOUNT, bundlePlans } from '@/lib/data';
import { bn, findProduct, taka } from '@/lib/format';
import { flyToCart } from '@/lib/motion';
import { useAnimatedNumber } from '../motion';
import { useShop } from '../ShopProvider';
import { useToast } from '../ToastProvider';
import { delay } from '../ui';

const families = [
    { n: 2, emoji: '👨‍👩‍👦', title: 'ছোট পরিবার', sub: '২-৩ জন' },
    { n: 4, emoji: '👨‍👩‍👧‍👦', title: 'মাঝারি পরিবার', sub: '৪-৫ জন' },
    { n: 6, emoji: '🏡', title: 'যৌথ পরিবার', sub: '৬+ জন' },
];

const perks = [
    ['fa-calendar-check', 'প্রতি মাসে ডেলিভারি', 'নির্দিষ্ট তারিখে বাসায় পৌঁছে যাবে', 'bg-gold-100 text-gold-600'],
    ['fa-percent', '৫% প্যাকেজ ছাড়', 'আলাদা কেনার চেয়ে সাশ্রয়ী', 'bg-leaf-50 text-leaf-700'],
    ['fa-sliders', 'কাস্টমাইজ করুন', 'যেকোনো পণ্যের পরিমাণ বদলান', 'bg-gold-100 text-gold-600'],
];

export default function PackageClient() {
    const { addBundle } = useShop();
    const toast = useToast();
    const [family, setFamily] = useState(2);
    const [plan, setPlan] = useState<Record<string, number>>({ ...bundlePlans[2] });
    const [round, setRound] = useState(0); // bumps on family change / reset to replay the stagger
    const listRef = useRef<HTMLDivElement>(null);

    function selectFamily(n: number) {
        setFamily(n);
        setPlan({ ...bundlePlans[n] });
        setRound(r => r + 1);
    }
    const setPlanQty = (id: string, d: number) => setPlan(p => ({ ...p, [id]: Math.max(0, (p[id] || 0) + d) }));

    const rows = Object.entries(plan).map(([id, q]) => ({ p: findProduct(id)!, q }));
    const total = rows.reduce((s, r) => s + r.p.price * r.q, 0);
    const count = rows.reduce((s, r) => s + r.q, 0);
    const discounted = total * (1 - BUNDLE_DISCOUNT);
    const shownTotal = useAnimatedNumber(discounted, 600);

    function addBundleToCart() {
        const chosen = Object.fromEntries(Object.entries(plan).filter(([, q]) => q > 0));
        if (!Object.keys(chosen).length) return toast('প্যাকেজে অন্তত একটি পণ্য রাখুন।', 'error');
        flyToCart(listRef.current?.querySelector('img'), () => {
            addBundle(chosen);
            toast('পারিবারিক প্যাকেজ কার্টে যোগ হয়েছে — ৫% ছাড়সহ!', 'success', { href: '/cart', label: 'কার্ট দেখুন' });
        });
    }

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative">

                {/* Step 1: family size */}
                <div className="grid sm:grid-cols-3 gap-4">
                    {families.map((f, i) => {
                        const active = f.n === family;
                        return (
                            <button key={f.n} onClick={() => selectFamily(f.n)} data-reveal="up" style={delay(i * 0.1)} className={`group relative text-left p-6 rounded-4xl border-2 transition-all duration-500 overflow-hidden ${active
                                ? 'bg-leaf-900 border-leaf-900 text-white shadow-2xl shadow-leaf-900/30 -translate-y-1'
                                : 'bg-white border-leaf-900/5 text-leaf-950 hover:border-leaf-600'}`}>
                                <span className="absolute -right-4 -bottom-6 text-8xl opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">{f.emoji}</span>
                                <span className="text-3xl">{f.emoji}</span>
                                <p className="font-display font-bold text-xl mt-3">{f.title}</p>
                                <p className={`text-sm ${active ? 'text-lime-500' : 'text-leaf-900/50'}`}>{f.sub}</p>
                                <span className={`absolute top-5 right-5 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-lime-500 border-lime-500 text-leaf-950' : 'border-leaf-900/20'}`}>{active && <i className="fa-solid fa-check text-xs"></i>}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-12 gap-6 mt-8">
                    {/* Step 2: items */}
                    <div className="lg:col-span-8 bg-white rounded-5xl p-4 sm:p-8 border border-leaf-900/5" data-reveal="up">
                        <div className="flex items-center justify-between mb-5 px-2">
                            <h2 className="font-display font-bold text-2xl text-leaf-950">প্যাকেজে যা থাকছে</h2>
                            <button onClick={() => selectFamily(family)} className="text-xs font-bold text-leaf-900/50 hover:text-leaf-900 flex items-center gap-1.5"><i className="fa-solid fa-rotate-left"></i>রিসেট</button>
                        </div>
                        <div ref={listRef} className="space-y-2">
                            {rows.map(({ p, q }, i) => (
                                <div key={`${round}-${p.id}`} className={`group flex items-center gap-4 p-3 rounded-3xl hover:bg-cream transition-colors ${q === 0 ? 'opacity-40' : ''}`} style={{ animation: `logo-pop .5s ${i * 0.06}s both` }}>
                                    <img src={p.image} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500" />
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${p.id}`} className="font-bold text-leaf-950 hover:text-leaf-600 leading-snug">{p.name}</Link>
                                        <p className="text-xs text-leaf-900/50">{p.weight} · {taka(p.price)}</p>
                                    </div>
                                    <div className="flex items-center bg-white border border-leaf-900/10 rounded-full p-0.5">
                                        <button onClick={() => setPlanQty(p.id, -1)} aria-label="কমান" className="w-8 h-8 rounded-full hover:bg-cream">−</button>
                                        <span className="w-7 text-center font-bold text-sm">{bn(q)}</span>
                                        <button onClick={() => setPlanQty(p.id, 1)} aria-label="বাড়ান" className="w-8 h-8 rounded-full hover:bg-cream">+</button>
                                    </div>
                                    <span className="w-20 text-right font-display font-bold text-leaf-950 hidden sm:block">{taka(p.price * q)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4" data-reveal="right">
                        <div className="lg:sticky lg:top-28 relative overflow-hidden rounded-5xl mesh-bg grain text-white p-8">
                            <div className="blob w-48 h-48 bg-lime-500/40 -top-16 -right-16 animate-blob"></div>
                            <div className="relative">
                                <p className="text-xs font-bold uppercase tracking-widest text-lime-500">মাসিক খরচ</p>
                                <p className="text-white/40 line-through mt-4 h-6">{total ? taka(total) : ''}</p>
                                <p className="font-display font-extrabold text-5xl">{taka(shownTotal)}</p>
                                <p className="inline-flex items-center gap-2 mt-3 text-sm bg-lime-500 text-leaf-950 font-bold px-3 py-1 rounded-full"><i className="fa-solid fa-piggy-bank"></i> সাশ্রয় {taka(total - discounted)}</p>

                                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-white/70">
                                    <div className="flex justify-between"><span>মোট আইটেম</span><b className="text-white">{bn(count)} টি</b></div>
                                    <div className="flex justify-between"><span>প্যাকেজ ছাড়</span><b className="text-lime-500">৫%</b></div>
                                </div>
                                <button onClick={addBundleToCart} data-magnetic className="btn btn-lime w-full py-4 mt-7"><i className="fa-solid fa-bag-shopping"></i> প্যাকেজ কার্টে যোগ করুন</button>
                                <p className="text-[11px] text-white/40 text-center mt-3">ছাড় কার্ট ও চেকআউটে স্বয়ংক্রিয়ভাবে যুক্ত হবে</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                    {perks.map(([icon, title, sub, tone], i) => (
                        <div key={title} data-reveal="up" style={delay(i * 0.1)} className="p-6 rounded-4xl bg-white border border-leaf-900/5 flex gap-4 hover:-translate-y-1 transition-transform duration-500">
                            <span className={`w-12 h-12 rounded-2xl ${tone} flex items-center justify-center text-xl shrink-0`}><i className={`fa-solid ${icon}`}></i></span>
                            <div><p className="font-bold text-leaf-950">{title}</p><p className="text-xs text-leaf-900/60 mt-1">{sub}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
