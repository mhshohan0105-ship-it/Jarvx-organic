'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { categories, img, IMG, productsData } from '@/lib/data';
import { bn, findProduct } from '@/lib/format';
import { navigateWithCurtain } from '@/lib/motion';
import { Split } from './motion';
import { ProductCard } from './ProductCard';

const catImage: Record<string, string> = { Honey: IMG.sundarban, Dates: IMG.ajwaL, OilGhee: IMG.ghee, Spice: IMG.chili, Health: IMG.matcha, Nuts: IMG.cashew };
const catDesc: Record<string, string> = { Honey: 'সুন্দরবন, কালোজিরা, লিচু ও সিডর মধু', Dates: 'আজওয়া, সুক্কারি ও মেডজুল খেজুর', OilGhee: 'গাওয়া ঘি, সরিষা ও নারিকেল তেল', Spice: 'খাঁটি মসলা, আটা ও ডাল', Health: 'মাচা, স্পিরুলিনা, ভিনেগার ও সুগার', Nuts: 'প্রিমিয়াম কাজুবাদাম' };

export function CategoryAccordion() {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const cats = categories.filter(c => c.id !== 'All');
    return (
        <div className="cat-accordion" data-reveal="up">
            {cats.map((c, i) => {
                const count = productsData.filter(p => p.category === c.id).length;
                return (
                    <div key={c.id} className={`cat-panel ${i === active ? 'active' : ''}`} onMouseEnter={() => setActive(i)}
                        onClick={() => i === active ? navigateWithCurtain(router, `/products?cat=${c.id}`) : setActive(i)}>
                        <img src={img(catImage[c.id], 900)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/95 via-leaf-950/40 to-leaf-950/10"></div>
                        <span className="cat-vert hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap text-white font-display font-bold text-xl">{c.label}</span>
                        <span className="md:hidden absolute left-5 top-1/2 -translate-y-1/2 cat-vert text-white font-display font-bold text-xl">{c.label}</span>
                        <div className="cat-body absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                            <span className="text-xs font-bold bg-lime-500 text-leaf-950 px-3 py-1 rounded-full">{bn(count)} টি পণ্য</span>
                            <h3 className="font-bold text-3xl mt-3">{c.label}</h3>
                            <p className="text-white/70 text-sm mt-1">{catDesc[c.id]}</p>
                            <Link href={`/products?cat=${c.id}`} onClick={e => e.stopPropagation()} className="btn btn-lime px-5 py-2.5 text-sm mt-4">দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const featuredSets = [
    { label: 'জনপ্রিয়', ids: ['jv-2', 'jv-12', 'jv-22', 'jv-24', 'jv-16', 'jv-10', 'jv-35', 'jv-42'] },
    { label: '🍯 মধু', ids: ['jv-1', 'jv-2', 'jv-4', 'jv-6', 'jv-9', 'jv-10', 'jv-11', 'jv-3'] },
    { label: '🌴 খেজুর', ids: ['jv-12', 'jv-13', 'jv-16', 'jv-17', 'jv-18', 'jv-19', 'jv-20', 'jv-21'] },
    { label: '🧈 তেল-ঘি', ids: ['jv-22', 'jv-23', 'jv-24', 'jv-25', 'jv-26', 'jv-27', 'jv-28', 'jv-30'] },
    { label: '🌿 হেলথ', ids: ['jv-34', 'jv-35', 'jv-36', 'jv-37', 'jv-38', 'jv-39', 'jv-40', 'jv-41'] },
];

export function FeaturedProducts() {
    const [tab, setTab] = useState(0);
    const [shownSet, setShownSet] = useState(0);
    const [fading, setFading] = useState(false);

    function switchSet(i: number) {
        if (i === tab) return;
        setTab(i);
        setFading(true);
        setTimeout(() => { setShownSet(i); setFading(false); }, 300);
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                    <p data-reveal="up" className="eyebrow bg-gold-100 text-gold-700">বাছাইকৃত</p>
                    <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4">সবচেয়ে জনপ্রিয় পণ্য</Split>
                </div>
                <div data-reveal="up" className="relative flex gap-1 p-1.5 bg-cream rounded-full overflow-x-auto scrollbar-none">
                    {featuredSets.map((s, i) => (
                        <button key={s.label} onClick={() => switchSet(i)} className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300 ${i === tab ? 'bg-leaf-900 text-lime-500 shadow-lg' : 'text-leaf-900/60 hover:text-leaf-900'}`}>{s.label}</button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ transition: 'opacity .3s, transform .3s', opacity: fading ? 0 : 1, transform: fading ? 'translateY(15px)' : 'none' }}>
                {featuredSets[shownSet].ids.map((id, i) => <ProductCard key={id} p={findProduct(id)!} i={i} />)}
            </div>
        </>
    );
}
