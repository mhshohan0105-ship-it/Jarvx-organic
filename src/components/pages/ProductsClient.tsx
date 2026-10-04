'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, productsData } from '@/lib/data';
import { bn, matchesSearch } from '@/lib/format';
import { SEARCH_EVENT } from '../Header';
import { ProductCard } from '../ProductCard';

export default function ProductsClient() {
    const params = useSearchParams();
    const catParam = params.get('cat');
    const category = categories.some(c => c.id === catParam) ? catParam! : 'All';
    const query = params.get('q') || '';
    const [sort, setSort] = useState('default');

    const list = useMemo(() => {
        let l = productsData.filter(p => (category === 'All' || p.category === category) && matchesSearch(p, query));
        if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price);
        if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price);
        if (sort === 'name') l = [...l].sort((a, b) => a.en.localeCompare(b.en));
        return l;
    }, [category, query, sort]);

    // Fade the grid out, swap the list, fade back in
    const [shown, setShown] = useState(list);
    const [fading, setFading] = useState(false);
    const first = useRef(true);
    useEffect(() => {
        if (first.current) { first.current = false; setShown(list); return; }
        setFading(true);
        const t = setTimeout(() => { setShown(list); setFading(false); }, 250);
        return () => clearTimeout(t);
    }, [list]);

    // URL is the source of truth for category + search (shareable, and the header search writes ?q=)
    function setUrl(cat: string, q: string) {
        const p = new URLSearchParams();
        if (cat !== 'All') p.set('cat', cat);
        if (q) p.set('q', q);
        history.replaceState(null, '', '/products' + (p.toString() ? '?' + p : ''));
    }
    function clearSearch() {
        setUrl(category, '');
        dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail: '' }));
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Sticky filter bar */}
            <div className="sticky top-24 z-30 -mt-8 mb-10" data-reveal="up">
                <div className="bg-white/90 backdrop-blur-xl rounded-4xl shadow-xl shadow-leaf-900/5 border border-leaf-900/5 p-2 flex flex-col lg:flex-row lg:items-center gap-2">
                    <div className="relative flex gap-1 overflow-x-auto scrollbar-none flex-1">
                        {categories.map(c => {
                            const n = c.id === 'All' ? productsData.length : productsData.filter(p => p.category === c.id).length;
                            return (
                                <button key={c.id} onClick={() => setUrl(c.id, query)} className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${c.id === category
                                    ? 'bg-leaf-900 text-lime-500 shadow-lg'
                                    : 'text-leaf-900/60 hover:text-leaf-900 hover:bg-cream'}`}>{c.label} <span className="opacity-60 text-[11px]">{bn(n)}</span></button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-2 px-2 pb-1 lg:pb-0">
                        <span className="text-xs text-leaf-900/60 whitespace-nowrap"><b className="text-leaf-900 text-sm">{bn(shown.length)}</b> টি পণ্য</span>
                        <div className="relative">
                            <select value={sort} onChange={e => setSort(e.target.value)} className="appearance-none text-xs pl-4 pr-9 py-2.5 bg-cream rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-leaf-600 cursor-pointer">
                                <option value="default">ডিফল্ট ক্রম</option>
                                <option value="low">দাম: কম → বেশি</option>
                                <option value="high">দাম: বেশি → কম</option>
                                <option value="name">নাম (A-Z)</option>
                            </select>
                            <i className="fa-solid fa-chevron-down absolute right-3.5 top-3 text-[10px] text-leaf-900/50 pointer-events-none"></i>
                        </div>
                    </div>
                </div>
            </div>

            {query && (
                <div className="mb-6 flex items-center gap-2 text-sm text-leaf-900/70">
                    <i className="fa-solid fa-magnifying-glass text-leaf-600"></i>
                    &quot;<b className="text-leaf-950">{query}</b>&quot; এর ফলাফল
                    <button onClick={clearSearch} className="ml-2 text-xs font-bold bg-leaf-900 text-lime-500 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-colors">মুছুন ✕</button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" style={{ transition: 'opacity .25s, transform .25s', opacity: fading ? 0 : 1, transform: fading ? 'translateY(12px)' : 'none' }}>
                {shown.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
            </div>

            {!shown.length && (
                <div className="text-center py-24">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center text-4xl text-leaf-900/20 animate-float"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <p className="font-display font-bold text-2xl text-leaf-950 mt-6">কোনো পণ্য পাওয়া যায়নি</p>
                    <p className="text-sm text-leaf-900/60 mt-1">অন্য কিছু লিখে খুঁজুন বা ক্যাটাগরি পরিবর্তন করুন।</p>
                </div>
            )}
        </div>
    );
}
