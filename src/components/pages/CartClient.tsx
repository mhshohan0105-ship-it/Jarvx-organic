'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { DELIVERY_OPTIONS, PROMO_CODE } from '@/lib/data';
import { bn, findProduct, taka } from '@/lib/format';
import { useAnimatedNumber } from '../motion';
import { useShop, type CartItem } from '../ShopProvider';
import { useToast } from '../ToastProvider';

export function DeliveryPicker() {
    const { delivery, setDelivery } = useShop();
    return (
        <div className="grid grid-cols-2 gap-2">
            {DELIVERY_OPTIONS.map(o => (
                <button key={o.value} type="button" onClick={() => setDelivery(o.value)} className={`p-3 rounded-2xl border-2 text-xs font-bold text-left transition-all ${o.value === delivery ? 'border-leaf-900 bg-leaf-900 text-lime-500' : 'border-leaf-900/10 text-leaf-900 hover:border-leaf-600'}`}>{o.label}</button>
            ))}
        </div>
    );
}

export function SummaryRows() {
    const { totals: t } = useShop();
    return (
        <>
            <div className="flex justify-between text-leaf-900/70"><span>পণ্যের মূল্য</span><b className="text-leaf-950">{taka(t.subtotal)}</b></div>
            {t.bundleDiscount > 0 && <div className="flex justify-between text-leaf-600"><span>প্যাকেজ ছাড় (৫%)</span><b>− {taka(t.bundleDiscount)}</b></div>}
            {t.promo && <div className="flex justify-between text-leaf-600"><span>প্রোমো ছাড় (১০%)</span><b>− {taka(t.discount)}</b></div>}
            <div className="flex justify-between text-leaf-900/70"><span>ডেলিভারি চার্জ</span><b className="text-leaf-950">{taka(t.delivery)}</b></div>
        </>
    );
}

export function Steps({ step }: { step: 1 | 2 }) {
    return (
        <div data-reveal="up" className="flex items-center justify-center gap-2 sm:gap-4 mb-10 text-sm font-bold">
            {step === 1
                ? <span className="flex items-center gap-2 text-leaf-950"><span className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center">১</span>কার্ট</span>
                : <Link href="/cart" className="flex items-center gap-2 text-leaf-600"><span className="w-8 h-8 rounded-full bg-leaf-900 text-lime-500 flex items-center justify-center"><i className="fa-solid fa-check text-xs"></i></span>কার্ট</Link>}
            <span className={`w-10 sm:w-20 h-0.5 ${step === 2 ? 'bg-leaf-900' : 'bg-leaf-900/10'}`}></span>
            <span className={`flex items-center gap-2 ${step === 2 ? 'text-leaf-950' : 'text-leaf-900/40'}`}><span className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-lime-500' : 'bg-white border border-leaf-900/10'}`}>২</span>তথ্য</span>
            <span className="w-10 sm:w-20 h-0.5 bg-leaf-900/10"></span>
            <span className="flex items-center gap-2 text-leaf-900/40"><span className="w-8 h-8 rounded-full bg-white border border-leaf-900/10 flex items-center justify-center">৩</span>সম্পন্ন</span>
        </div>
    );
}

export default function CartClient() {
    const { ready, cart, bundle, count, totals, setQty, remove, clear, promo, setPromo } = useShop();
    const toast = useToast();
    const [removing, setRemoving] = useState<string[]>([]);
    const [promoInput, setPromoInput] = useState('');
    const promoBox = useRef<HTMLDivElement>(null);
    const total = useAnimatedNumber(totals.total);

    function removeItem(id: string) {
        setRemoving(r => [...r, id]);
        setTimeout(() => {
            remove(id);
            setRemoving(r => r.filter(x => x !== id));
            toast('পণ্যটি কার্ট থেকে সরানো হয়েছে', 'info');
        }, 450);
    }

    function changeQty(item: CartItem, d: number) {
        if (item.quantity + d <= 0) return removeItem(item.id);
        setQty(item.id, item.quantity + d);
    }

    function clearCart() {
        cart.forEach((item, i) => setTimeout(() => setRemoving(r => [...r, item.id]), i * 60));
        setTimeout(() => { clear(); setRemoving([]); }, 500);
    }

    function applyPromo() {
        if (promoInput.trim().toUpperCase() === PROMO_CODE) {
            setPromo(true);
            setPromoInput('');
            toast('প্রোমো কোড প্রয়োগ হয়েছে — ১০% ছাড়!');
        } else {
            promoBox.current?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 });
            toast('প্রোমো কোডটি সঠিক নয়', 'error');
        }
    }

    const qtyControl = (i: CartItem) => (
        <div className="flex items-center bg-cream rounded-full p-0.5">
            <button onClick={() => changeQty(i, -1)} aria-label="কমান" className="w-8 h-8 rounded-full hover:bg-white transition-colors">−</button>
            <span className="w-7 text-center font-bold text-sm">{bn(i.quantity)}</span>
            <button onClick={() => changeQty(i, 1)} aria-label="বাড়ান" className="w-8 h-8 rounded-full hover:bg-white transition-colors">+</button>
        </div>
    );

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative">
                <Steps step={1} />

                {ready && (cart.length ? (
                    <div className="grid lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <div data-reveal="up" className="bg-white rounded-5xl p-3 sm:p-6 border border-leaf-900/5">
                                <div className="flex items-center justify-between px-3 pb-4 border-b border-leaf-900/5">
                                    <h2 className="font-display font-bold text-xl text-leaf-950">{bn(count)} টি আইটেম</h2>
                                    <button onClick={clearCart} className="text-xs font-bold text-red-500 hover:underline">সব মুছুন</button>
                                </div>
                                <div>
                                    {cart.map(i => {
                                        const p = findProduct(i.id)!;
                                        return (
                                            <div key={i.id} className={`cart-row flex items-center gap-4 px-3 py-4 border-b border-leaf-900/5 last:border-0 ${removing.includes(i.id) ? 'removing' : ''}`}>
                                                <Link href={`/products/${p.id}`} className="shrink-0"><img src={p.image} alt="" className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover hover:scale-105 hover:rotate-2 transition-transform duration-500" /></Link>
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/products/${p.id}`} className="font-bold text-leaf-950 hover:text-leaf-600 leading-snug">{p.name}</Link>
                                                    <p className="text-xs text-leaf-900/50 mt-0.5">{p.weight} · {taka(p.price)}</p>
                                                    {bundle[i.id] ? <span className="inline-block mt-1.5 text-[10px] font-bold bg-lime-500 text-leaf-950 px-2 py-0.5 rounded-full">প্যাকেজ ছাড় প্রযোজ্য</span> : null}
                                                    <div className="flex items-center gap-3 mt-2 sm:hidden">{qtyControl(i)}</div>
                                                </div>
                                                <div className="hidden sm:block">{qtyControl(i)}</div>
                                                <div className="text-right">
                                                    <p className="font-display font-bold text-lg text-leaf-950 whitespace-nowrap">{taka(p.price * i.quantity)}</p>
                                                    <button onClick={() => removeItem(i.id)} aria-label="মুছুন" className="mt-1 w-8 h-8 rounded-full text-leaf-900/40 hover:bg-red-50 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash-can text-sm"></i></button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <Link href="/products" className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-leaf-700 hover:gap-3 transition-all"><i className="fa-solid fa-arrow-left"></i> কেনাকাটা চালিয়ে যান</Link>
                        </div>

                        <aside className="lg:col-span-4" data-reveal="right">
                            <div className="lg:sticky lg:top-28 bg-white rounded-5xl p-6 sm:p-8 border border-leaf-900/5 space-y-5">
                                <h2 className="font-display font-bold text-xl text-leaf-950">অর্ডার সারাংশ</h2>
                                <div>
                                    <p className="text-xs font-bold text-leaf-900/50 uppercase tracking-wider mb-2">ডেলিভারি এলাকা</p>
                                    <DeliveryPicker />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-leaf-900/50 uppercase tracking-wider mb-2">প্রোমো কোড</p>
                                    <div ref={promoBox} className="flex bg-cream rounded-full p-1">
                                        <input value={promoInput} onChange={e => setPromoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} type="text" placeholder={PROMO_CODE} className="flex-1 min-w-0 bg-transparent px-4 text-sm uppercase focus:outline-none" />
                                        <button onClick={applyPromo} className="btn btn-dark px-5 py-2.5 text-xs">প্রয়োগ</button>
                                    </div>
                                    {promo && <p className="text-xs text-leaf-600 font-bold mt-2"><i className="fa-solid fa-circle-check"></i> ১০% ছাড় প্রয়োগ হয়েছে <button onClick={() => setPromo(false)} className="text-red-500 ml-1 underline">সরান</button></p>}
                                </div>
                                <div className="space-y-2.5 text-sm pt-4 border-t border-leaf-900/5"><SummaryRows /></div>
                                <div className="flex justify-between items-end pt-4 border-t border-dashed border-leaf-900/15">
                                    <span className="font-bold text-leaf-950">সর্বমোট</span>
                                    <span className="font-display font-extrabold text-3xl text-leaf-950">{taka(total)}</span>
                                </div>
                                <Link href="/checkout" data-magnetic className="btn btn-lime w-full py-4">চেকআউট করুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                                <p className="text-[11px] text-center text-leaf-900/50"><i className="fa-solid fa-lock"></i> নিরাপদ অর্ডার · ক্যাশ অন ডেলিভারি</p>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-5xl">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 rounded-full bg-lime-500/30 animate-ping"></div>
                            <div className="relative w-32 h-32 rounded-full bg-lime-500 text-leaf-950 flex items-center justify-center text-5xl"><i className="fa-solid fa-basket-shopping"></i></div>
                        </div>
                        <p className="font-display font-bold text-3xl text-leaf-950 mt-8">আপনার কার্ট খালি</p>
                        <p className="text-leaf-900/60 mt-2">খাঁটি পণ্য দিয়ে কার্টটি ভরে ফেলুন!</p>
                        <Link href="/products" data-magnetic className="btn btn-dark px-8 py-4 mt-7">কেনাকাটা শুরু করুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
