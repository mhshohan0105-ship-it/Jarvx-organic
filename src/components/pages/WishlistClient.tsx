'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { bn, findProduct } from '@/lib/format';
import { ProductCard } from '../ProductCard';
import { useShop } from '../ShopProvider';
import { useToast } from '../ToastProvider';

export default function WishlistClient() {
    const { ready, wishlist, add } = useShop();
    const toast = useToast();
    // Lag behind the real list a little so the heart animation plays before a card disappears
    const [shown, setShown] = useState(wishlist);
    useEffect(() => {
        const t = setTimeout(() => setShown(wishlist), shown.length ? 350 : 0);
        return () => clearTimeout(t);
    }, [wishlist]);

    function addAllToCart() {
        wishlist.forEach(id => add(id, 1, true));
        toast('সব পছন্দের পণ্য কার্টে যোগ হয়েছে', 'success', { href: '/cart', label: 'কার্ট দেখুন' });
    }

    const list = shown.map(id => findProduct(id)!).filter(Boolean);

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {list.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                        <p className="text-leaf-900/70"><b className="text-leaf-950">{bn(list.length)}</b> টি পণ্য সংরক্ষিত</p>
                        <button onClick={addAllToCart} className="btn btn-dark px-6 py-3 text-sm"><i className="fa-solid fa-bag-shopping"></i> সবগুলো কার্টে যোগ করুন</button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {ready && (list.length ? list.map((p, i) => <ProductCard key={p.id} p={p} i={i} />) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-5xl">
                            <div className="relative w-28 h-28 mx-auto rounded-full bg-red-50 text-red-400 flex items-center justify-center text-5xl animate-float"><i className="fa-regular fa-heart"></i></div>
                            <p className="font-display font-bold text-2xl text-leaf-950 mt-6">পছন্দের তালিকা খালি</p>
                            <p className="text-sm text-leaf-900/60 mt-1">পণ্যের ছবিতে থাকা ❤️ বাটনে চাপ দিয়ে এখানে সংরক্ষণ করুন।</p>
                            <Link href="/products" className="btn btn-lime px-7 py-3.5 mt-6">পণ্য দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
