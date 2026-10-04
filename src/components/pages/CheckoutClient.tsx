'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { bn, findProduct, taka } from '@/lib/format';
import { confetti } from '@/lib/motion';
import { store, useShop } from '../ShopProvider';
import { DeliveryPicker, Steps, SummaryRows } from './CartClient';

type Placed = { id: string; total: number };

export default function CheckoutClient() {
    const { ready, cart, totals, clear, setPromo } = useShop();
    const [submitting, setSubmitting] = useState(false);
    const [placed, setPlaced] = useState<Placed | null>(null);

    function placeOrder(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setSubmitting(true);

        // Front-end only: the order is kept in this browser. Connect a backend/API here to receive real orders.
        const order = {
            id: 'JVX-' + Date.now().toString().slice(-6),
            at: new Date().toISOString(),
            items: cart,
            totals,
            customer: { name: f.get('name'), phone: f.get('phone'), address: f.get('address'), note: f.get('note') },
            payment: f.get('payment'),
        };
        setTimeout(() => {
            store.set('orders', [order, ...store.get<unknown[]>('orders', [])]);
            clear();
            setPromo(false);
            setPlaced({ id: order.id, total: totals.total });
            scrollTo({ top: 0, behavior: 'smooth' });
            confetti();
        }, 900);
    }

    if (!ready) return <main className="flex-1 bg-cream pb-20"></main>;

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative">
                {placed ? (
                    <div className="max-w-xl mx-auto text-center bg-white rounded-5xl p-10 sm:p-14 border border-leaf-900/5" style={{ animation: 'logo-pop .7s cubic-bezier(.34,1.56,.64,1) both' }}>
                        <div className="relative w-28 h-28 mx-auto">
                            <div className="absolute inset-0 rounded-full bg-lime-500/40 animate-ping"></div>
                            <div className="relative w-28 h-28 rounded-full bg-lime-500 flex items-center justify-center">
                                <svg viewBox="0 0 52 52" className="w-14 h-14"><path className="check-draw" fill="none" stroke="#06201A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" d="M14 27 l8 8 l16 -18" /></svg>
                            </div>
                        </div>
                        <h2 className="font-bold text-4xl text-leaf-950 mt-8">ধন্যবাদ!</h2>
                        <p className="text-leaf-900/70 mt-3">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। শীঘ্রই আমাদের প্রতিনিধি কল করে নিশ্চিত করবেন।</p>
                        <div className="mt-6 inline-flex flex-col gap-1 bg-cream rounded-3xl px-8 py-4">
                            <span className="text-xs text-leaf-900/50">অর্ডার আইডি</span>
                            <b className="font-brand text-xl text-leaf-950 tracking-wider">{placed.id}</b>
                            <span className="text-sm text-leaf-700 font-bold">সর্বমোট {taka(placed.total)}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                            <Link href="/products" className="btn btn-dark px-7 py-3.5">কেনাকাটা চালিয়ে যান <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                            <Link href="/" className="btn btn-ghost !text-leaf-900 !border-leaf-900/15 px-7 py-3.5">হোমে যান</Link>
                        </div>
                    </div>
                ) : !cart.length ? (
                    <div className="text-center py-20 bg-white rounded-5xl">
                        <div className="w-28 h-28 mx-auto rounded-full bg-cream text-leaf-900/30 flex items-center justify-center text-5xl animate-float"><i className="fa-solid fa-basket-shopping"></i></div>
                        <p className="font-display font-bold text-2xl text-leaf-950 mt-6">চেকআউটের জন্য কার্টে কোনো পণ্য নেই</p>
                        <Link href="/products" className="btn btn-dark px-7 py-3.5 mt-6">পণ্য দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                    </div>
                ) : (
                    <>
                        <Steps step={2} />
                        <form onSubmit={placeOrder} className="grid lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 space-y-6">
                                <div data-reveal="up" className="bg-white rounded-5xl p-6 sm:p-8 border border-leaf-900/5 space-y-4">
                                    <h2 className="font-display font-bold text-2xl text-leaf-950 flex items-center gap-3"><span className="w-9 h-9 rounded-xl bg-lime-500 text-leaf-950 text-base flex items-center justify-center"><i className="fa-solid fa-user"></i></span>ডেলিভারি তথ্য</h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <label className="block"><span className="text-xs font-bold text-leaf-900/60">পূর্ণ নাম *</span><input name="name" required placeholder="যেমন: মো: কামরুল হাসান" className="input mt-1" /></label>
                                        <label className="block"><span className="text-xs font-bold text-leaf-900/60">মোবাইল নম্বর *</span><input name="phone" type="tel" required pattern="(\+?88)?01[3-9][0-9]{8}" title="সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন 01712345678)" placeholder="01XXXXXXXXX" className="input mt-1" /></label>
                                    </div>
                                    <label className="block"><span className="text-xs font-bold text-leaf-900/60">পূর্ণাঙ্গ ঠিকানা *</span><textarea name="address" required rows={2} placeholder="বাসা, রোড, এলাকা, জেলা" className="input mt-1"></textarea></label>
                                    <label className="block"><span className="text-xs font-bold text-leaf-900/60">অর্ডার নোট (ঐচ্ছিক)</span><input name="note" placeholder="যেমন: বিকেলে ডেলিভারি দিন" className="input mt-1" /></label>
                                </div>

                                <div data-reveal="up" style={{ '--d': '.1s' } as React.CSSProperties} className="bg-white rounded-5xl p-6 sm:p-8 border border-leaf-900/5 space-y-4">
                                    <h2 className="font-display font-bold text-2xl text-leaf-950 flex items-center gap-3"><span className="w-9 h-9 rounded-xl bg-gold-500 text-leaf-950 text-base flex items-center justify-center"><i className="fa-solid fa-wallet"></i></span>পেমেন্ট মেথড</h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <label className="pay-opt flex items-center gap-3 p-4 rounded-3xl border-2 border-leaf-900/10 cursor-pointer transition-all hover:border-leaf-600">
                                            <input type="radio" name="payment" value="cod" defaultChecked className="sr-only" />
                                            <span className="pay-dot w-5 h-5 rounded-full border-2 border-leaf-900/20 transition-colors"></span>
                                            <i className="fa-solid fa-hand-holding-dollar text-2xl text-leaf-700"></i>
                                            <span><b className="block text-sm text-leaf-950">ক্যাশ অন ডেলিভারি</b><span className="text-xs text-leaf-900/50">পণ্য হাতে পেয়ে পরিশোধ</span></span>
                                        </label>
                                        <label className="pay-opt flex items-center gap-3 p-4 rounded-3xl border-2 border-leaf-900/10 cursor-pointer transition-all hover:border-leaf-600">
                                            <input type="radio" name="payment" value="mfs" className="sr-only" />
                                            <span className="pay-dot w-5 h-5 rounded-full border-2 border-leaf-900/20 transition-colors"></span>
                                            <i className="fa-solid fa-mobile-screen-button text-2xl text-pink-600"></i>
                                            <span><b className="block text-sm text-leaf-950">bKash / Nagad</b><span className="text-xs text-leaf-900/50">কনফার্মেশন কলে নির্দেশনা</span></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <aside className="lg:col-span-5" data-reveal="right">
                                <div className="lg:sticky lg:top-28 bg-white rounded-5xl p-6 sm:p-8 border border-leaf-900/5">
                                    <h2 className="font-display font-bold text-xl text-leaf-950 mb-4">আপনার অর্ডার</h2>
                                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                        {cart.map(i => {
                                            const p = findProduct(i.id)!;
                                            return (
                                                <div key={i.id} className="flex items-center gap-3">
                                                    <div className="relative shrink-0"><img src={p.image} alt="" className="w-14 h-14 rounded-2xl object-cover" /><span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-leaf-900 text-lime-500 text-[10px] font-bold flex items-center justify-center">{bn(i.quantity)}</span></div>
                                                    <div className="flex-1 min-w-0"><p className="text-sm font-bold text-leaf-950 truncate">{p.name}</p><p className="text-xs text-leaf-900/50">{p.weight}</p></div>
                                                    <b className="text-sm text-leaf-950 whitespace-nowrap">{taka(p.price * i.quantity)}</b>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-5">
                                        <p className="text-xs font-bold text-leaf-900/50 uppercase tracking-wider mb-2">ডেলিভারি এলাকা</p>
                                        <DeliveryPicker />
                                    </div>
                                    <div className="space-y-2.5 text-sm pt-5 mt-5 border-t border-leaf-900/5"><SummaryRows /></div>
                                    <div className="flex justify-between items-end pt-4 mt-4 border-t border-dashed border-leaf-900/15">
                                        <span className="font-bold text-leaf-950">সর্বমোট</span>
                                        <span className="font-display font-extrabold text-3xl text-leaf-950">{taka(totals.total)}</span>
                                    </div>
                                    <button type="submit" disabled={submitting} className="btn btn-lime w-full py-4 mt-6">
                                        {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> অর্ডার করা হচ্ছে...</> : <>অর্ডার নিশ্চিত করুন <i className="fa-solid fa-arrow-right btn-icon"></i></>}
                                    </button>
                                    <p className="text-[11px] text-center text-leaf-900/50 mt-3"><i className="fa-solid fa-lock"></i> অর্ডারের পর আমাদের প্রতিনিধি কল করে নিশ্চিত করবেন</p>
                                </div>
                            </aside>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
