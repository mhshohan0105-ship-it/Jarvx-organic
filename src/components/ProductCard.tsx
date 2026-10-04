'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { Product } from '@/lib/data';
import { categoryLabel, taka } from '@/lib/format';
import { flyToCart } from '@/lib/motion';
import { useShop } from './ShopProvider';
import { delay } from './ui';

// Heart button; pops when toggled
export function WishButton({ id, className, size = '' }: { id: string; className: string; size?: string }) {
    const { wishlist, toggleWish } = useShop();
    const ref = useRef<HTMLButtonElement>(null);
    const liked = wishlist.includes(id);
    return (
        <button ref={ref} aria-label="পছন্দের তালিকা"
            onClick={() => {
                toggleWish(id);
                ref.current?.animate?.([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'cubic-bezier(.34,1.56,.64,1)' });
            }}
            className={`${className} ${liked ? 'text-red-500' : 'text-leaf-900'}`}>
            <i className={`fa-${liked ? 'solid' : 'regular'} fa-heart ${size}`}></i>
        </button>
    );
}

export function ProductCard({ p, i = 0 }: { p: Product; i?: number }) {
    const { add } = useShop();
    const imgRef = useRef<HTMLImageElement>(null);
    const [added, setAdded] = useState(false);

    function addFromCard() {
        setAdded(true);
        flyToCart(imgRef.current, () => add(p.id));
        setTimeout(() => setAdded(false), 1600);
    }

    return (
        <div className="p-card bg-white rounded-4xl p-2.5 border border-leaf-900/5 flex flex-col" data-tilt data-reveal="up" style={delay((i % 4) * 0.08)}>
            <div className="relative rounded-[1.6rem] overflow-hidden aspect-square bg-gradient-to-br from-gold-100 to-leaf-50">
                <Link href={`/products/${p.id}`} aria-label={p.en}><img ref={imgRef} src={p.image} alt={p.en} loading="lazy" className="p-img w-full h-full object-cover" /></Link>
                <span className="absolute top-3 left-3 glass-light text-leaf-900 text-[10px] font-bold px-3 py-1.5 rounded-full">{p.tag}</span>
                <WishButton id={p.id} className="absolute top-3 right-3 w-9 h-9 rounded-full glass-light flex items-center justify-center hover:scale-110 transition-transform" />
                <span className="absolute bottom-3 left-3 bg-leaf-950/80 backdrop-blur text-lime-500 text-[11px] font-bold px-3 py-1.5 rounded-full">{p.weight}</span>
            </div>
            <div className="px-2.5 pt-4 pb-2 flex-1 flex flex-col">
                <p className="text-[10px] font-bold text-leaf-600 uppercase tracking-widest">{categoryLabel(p.category)}</p>
                <Link href={`/products/${p.id}`} className="mt-1"><h3 className="font-bold text-[17px] text-leaf-950 leading-snug hover:text-leaf-600 transition-colors">{p.name}</h3></Link>
                <p className="text-[11px] text-leaf-900/40 font-brand mt-0.5">{p.en}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="font-display font-bold text-2xl text-leaf-950">{taka(p.price)}</span>
                    <button onClick={addFromCard} aria-label="কার্টে যোগ করুন" className={`add-btn ${added ? 'added' : ''} h-11 min-w-11 px-3.5 rounded-full bg-leaf-900 text-lime-500 hover:text-leaf-950 hover:bg-lime-500 flex items-center justify-center gap-2 font-bold text-xs`}>
                        <i className={`fa-solid ${added ? 'fa-check' : 'fa-plus'}`}></i><span className="add-label">কার্টে যোগ</span>
                    </button>
                </div>
            </div>
            <div className="p-glare"></div>
        </div>
    );
}
