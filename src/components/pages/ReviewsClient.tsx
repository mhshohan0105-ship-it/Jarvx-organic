'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { categories, productsData, reviewsData, type Review } from '@/lib/data';
import { bn, findProduct } from '@/lib/format';
import { store } from '../ShopProvider';
import { useToast } from '../ToastProvider';
import { ReviewCard } from '../ui';

const fieldDark = 'input bg-white/10 border-white/10 text-white placeholder-white/40 focus:bg-white/15';

export default function ReviewsClient() {
    const toast = useToast();
    // Reviews written on this device are stored locally and shown alongside the built-in ones
    const [mine, setMine] = useState<Review[]>([]);
    const [filter, setFilter] = useState('All');
    const [stars, setStars] = useState(5);
    const [barsIn, setBarsIn] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setMine(store.get<Review[]>('myReviews', []));
        const t = setTimeout(() => setBarsIn(true), 400);
        return () => clearTimeout(t);
    }, []);

    const all = mine.concat(reviewsData);
    const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    const list = all.filter(r => filter === 'All' || findProduct(r.product)?.category === filter);

    function submitReview(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const next = [{ name: String(f.get('name')).trim(), loc: String(f.get('loc')).trim(), text: String(f.get('text')).trim(), product: String(f.get('product')), rating: stars }, ...mine];
        store.set('myReviews', next);
        setMine(next);
        e.currentTarget.reset();
        setStars(5);
        setFilter('All');
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toast('ধন্যবাদ! আপনার রিভিউ যোগ হয়েছে।');
    }

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 -mt-6 relative">

                {/* Sidebar: summary */}
                <aside className="lg:col-span-4 space-y-6">
                    <div data-reveal="left" className="bg-white rounded-5xl p-8 border border-leaf-900/5 lg:sticky lg:top-28">
                        <div className="flex items-center gap-5">
                            <p className="font-display font-extrabold text-6xl text-leaf-950">{bn(avg.toFixed(1))}</p>
                            <div>
                                <div className="text-gold-500 text-lg">{[1, 2, 3, 4, 5].map(i => <i key={i} className={`fa-${i <= Math.round(avg) ? 'solid' : 'regular'} fa-star`}></i>)}</div>
                                <p className="text-sm text-leaf-900/50">{bn(all.length)} টি রিভিউ</p>
                            </div>
                        </div>
                        <div className="space-y-2.5 mt-6">
                            {[5, 4, 3, 2, 1].map(s => {
                                const n = all.filter(r => r.rating === s).length;
                                return (
                                    <div key={s} className="flex items-center gap-3 text-sm">
                                        <span className="w-6 text-leaf-900/60">{bn(s)}★</span>
                                        <div className="flex-1 h-2.5 bg-cream rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-gold-500 to-lime-500 rounded-full transition-all duration-1000 ease-out" style={{ width: barsIn ? `${(n / all.length) * 100}%` : 0 }}></div></div>
                                        <span className="w-6 text-right text-leaf-900/60">{bn(n)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="btn btn-lime w-full py-3.5 mt-7"><i className="fa-solid fa-pen"></i> রিভিউ লিখুন</button>
                    </div>
                </aside>

                {/* Reviews */}
                <div className="lg:col-span-8">
                    <div data-reveal="up" className="flex gap-1 p-1.5 bg-white rounded-full shadow-xl shadow-leaf-900/5 overflow-x-auto scrollbar-none mb-6">
                        {categories.map(c => (
                            <button key={c.id} onClick={() => setFilter(c.id)} className={`px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${c.id === filter ? 'bg-leaf-900 text-lime-500 shadow-lg' : 'text-leaf-900/60 hover:text-leaf-900'}`}>{c.label}</button>
                        ))}
                    </div>
                    <div ref={gridRef} className="grid sm:grid-cols-2 gap-5">
                        {list.length
                            ? list.map((r, i) => <ReviewCard key={`${r.name}-${r.text.length}-${i}`} r={r} />)
                            : <div className="sm:col-span-2 text-center py-16 bg-white rounded-4xl"><i className="fa-regular fa-comment-dots text-4xl text-leaf-900/20"></i><p className="text-leaf-900/60 mt-3">এই ক্যাটাগরিতে এখনো কোনো রিভিউ নেই — প্রথম রিভিউটি আপনিই লিখুন!</p></div>}
                    </div>

                    {/* Write review */}
                    <form ref={formRef} onSubmit={submitReview} data-reveal="up" className="mt-10 relative overflow-hidden rounded-5xl mesh-bg grain text-white p-8 sm:p-10">
                        <div className="blob w-64 h-64 bg-lime-500/30 -top-20 -right-20 animate-blob"></div>
                        <div className="relative">
                            <h2 className="font-bold text-3xl">আপনার অভিজ্ঞতা শেয়ার করুন</h2>
                            <p className="text-white/60 text-sm mt-1">আপনার রিভিউ অন্যদের সঠিক পণ্য বেছে নিতে সাহায্য করবে।</p>
                            <div className="flex gap-2 text-3xl mt-6">
                                {[1, 2, 3, 4, 5].map(i => <button key={i} type="button" onClick={() => setStars(i)} aria-label={`${i} তারা`} className={`hover:scale-125 transition-transform ${i <= stars ? 'text-gold-400' : 'text-white/20'}`}><i className="fa-solid fa-star"></i></button>)}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3 mt-5">
                                <input name="name" required placeholder="আপনার নাম" className={fieldDark} />
                                <input name="loc" required placeholder="এলাকা (যেমন: মিরপুর, ঢাকা)" className={fieldDark} />
                            </div>
                            <select name="product" required defaultValue="" className="input mt-3 bg-white/10 border-white/10 text-white focus:bg-white/15 [&>option]:text-leaf-950">
                                <option value="">কোন পণ্যের রিভিউ?</option>
                                {productsData.map(p => <option key={p.id} value={p.id}>{p.name} ({p.weight})</option>)}
                            </select>
                            <textarea name="text" required rows={3} placeholder="আপনার মতামত লিখুন..." className={`${fieldDark} mt-3`}></textarea>
                            <button type="submit" className="btn btn-lime px-8 py-4 mt-5">রিভিউ জমা দিন <i className="fa-solid fa-paper-plane btn-icon"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
