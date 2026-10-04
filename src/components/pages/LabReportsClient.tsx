'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { certsData } from '@/lib/data';
import { findProduct } from '@/lib/format';
import { Split } from '../motion';

const certProducts: Record<string, string[]> = { honey: ['jv-2', 'jv-4', 'jv-10'], oil: ['jv-22', 'jv-24', 'jv-25'], spice: ['jv-27', 'jv-28', 'jv-33'] };

const steps = [
    ['fa-vials', 'নমুনা সংগ্রহ', 'প্রতিটি নতুন ব্যাচ থেকে এলোমেলোভাবে নমুনা নেওয়া হয়।'],
    ['fa-building-columns', 'সরকারি ল্যাবে প্রেরণ', 'BCSIR ও BSTI অনুমোদিত পরীক্ষাগারে পাঠানো হয়।'],
    ['fa-microscope', 'বিশ্লেষণ', 'ভেজাল, হেভি মেটাল, কীটনাশক ও আর্দ্রতা পরীক্ষা।'],
    ['fa-file-circle-check', 'রিপোর্ট প্রকাশ', 'পাস করলে তবেই পণ্য বিক্রির জন্য ছাড়া হয়, রিপোর্ট এখানে প্রকাশ।'],
];

export default function LabReportsClient() {
    const [active, setActive] = useState(0);
    const [barsFor, setBarsFor] = useState(-1);
    const [modal, setModal] = useState(false);
    const [fill, setFill] = useState(0);
    const timeline = useRef<HTMLDivElement>(null);
    const c = certsData[active];
    const gold = c.tone === 'gold';

    // Result bars grow from 0 each time a report is shown
    useEffect(() => {
        let r2 = 0;
        const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setBarsFor(active)); });
        return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }, [active]);

    // Timeline fills as you scroll
    useEffect(() => {
        const onScroll = () => {
            const r = timeline.current!.getBoundingClientRect();
            setFill(Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height)));
        };
        addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = modal ? 'hidden' : '';
        if (!modal) return;
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && setModal(false);
        addEventListener('keydown', esc);
        return () => removeEventListener('keydown', esc);
    }, [modal]);

    return (
        <>
            <main className="flex-1 bg-cream pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Selector */}
                    <div className="flex justify-center -mt-6 relative z-10 mb-10" data-reveal="up">
                        <div className="flex gap-1 p-1.5 bg-white rounded-full shadow-xl shadow-leaf-900/5 overflow-x-auto scrollbar-none max-w-full">
                            {certsData.map((cert, i) => (
                                <button key={cert.key} onClick={() => setActive(i)} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${i === active ? 'bg-leaf-900 text-lime-500 shadow-lg' : 'text-leaf-900/60 hover:text-leaf-900'}`}>
                                    <i className={`fa-solid ${cert.icon}`}></i>{cert.title}</button>
                            ))}
                        </div>
                    </div>

                    <div key={c.key} className="grid lg:grid-cols-5 gap-6">
                        <div className={`lg:col-span-2 relative overflow-hidden rounded-5xl ${gold ? 'bg-gold-500 text-leaf-950' : 'mesh-bg grain text-white'} p-8 sm:p-10 flex flex-col justify-between min-h-[380px]`} style={{ animation: 'logo-pop .6s cubic-bezier(.16,1,.3,1) both' }}>
                            <i className={`fa-solid ${c.icon} absolute -right-6 -bottom-6 text-[180px] opacity-10 animate-float-slow`}></i>
                            <div className="relative">
                                <span className={`eyebrow ${gold ? 'bg-leaf-950/10' : 'glass text-lime-500'}`}>{c.lab}</span>
                                <h2 className="font-bold text-3xl sm:text-4xl mt-5 leading-tight">{c.title}</h2>
                                <p className={`mt-3 ${gold ? 'text-leaf-950/70' : 'text-white/70'}`}>{c.summary}</p>
                            </div>
                            <div className={`relative mt-8 space-y-2 text-sm ${gold ? 'text-leaf-950/70' : 'text-white/60'}`}>
                                <p><i className="fa-solid fa-hashtag w-5"></i> রেজি: <b className={`font-brand ${gold ? 'text-leaf-950' : 'text-white'}`}>{c.reg}</b></p>
                                <p><i className="fa-regular fa-calendar w-5"></i> পরীক্ষার তারিখ: <b className={gold ? 'text-leaf-950' : 'text-white'}>{c.date}</b></p>
                                <button onClick={() => setModal(true)} className={`btn ${gold ? 'btn-dark' : 'btn-lime'} px-6 py-3 mt-4`}>সার্টিফিকেট দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></button>
                            </div>
                        </div>

                        <div className="lg:col-span-3 bg-white rounded-5xl p-6 sm:p-10 border border-leaf-900/5" style={{ animation: 'logo-pop .6s .1s cubic-bezier(.16,1,.3,1) both' }}>
                            <h3 className="font-display font-bold text-2xl text-leaf-950">পরীক্ষার ফলাফল</h3>
                            <p className="text-sm text-leaf-900/50 mb-6">বার দেখাচ্ছে অনুমোদিত সীমার কত শতাংশ ব্যবহৃত — সবগুলোই সীমার মধ্যে</p>
                            <div className="space-y-5">
                                {c.results.map(([name, value, limit, used], i) => {
                                    const none = used === 0;
                                    return (
                                        <div key={name}>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="font-bold text-leaf-950">{name}</span>
                                                <span className="flex items-center gap-2"><b className={none ? 'text-leaf-600' : 'text-leaf-950'}>{value}</b><span className="text-xs text-leaf-900/40">সীমা {limit}</span></span>
                                            </div>
                                            <div className="h-3 rounded-full bg-cream overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-lime-500 to-leaf-500 transition-all duration-1000 ease-out" style={{ width: barsFor === active ? `${none ? 1.5 : used}%` : '0%', transitionDelay: `${0.3 + i * 0.12}s` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 pt-6 border-t border-leaf-900/5">
                                <p className="text-xs font-bold text-leaf-900/50 uppercase tracking-wider mb-3">এই রিপোর্টের আওতাভুক্ত পণ্য</p>
                                <div className="flex flex-wrap gap-2">
                                    {certProducts[c.key].map(id => {
                                        const p = findProduct(id)!;
                                        return <Link key={id} href={`/products/${id}`} className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full bg-cream hover:bg-lime-500 transition-colors text-sm font-semibold text-leaf-950"><img src={p.image} className="w-8 h-8 rounded-full object-cover" alt="" />{p.name}</Link>;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process */}
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <p data-reveal="up" className="eyebrow bg-leaf-900/5 text-leaf-700">আমাদের প্রক্রিয়া</p>
                            <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4">প্রতিটি ব্যাচ যেভাবে পরীক্ষা হয়</Split>
                        </div>
                        <div className="relative max-w-3xl mx-auto">
                            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-leaf-900/10 -translate-x-1/2">
                                <div className="w-full bg-gradient-to-b from-lime-500 to-gold-500 origin-top" style={{ height: `${fill * 100}%` }}></div>
                            </div>
                            <div ref={timeline} className="space-y-10">
                                {steps.map(([icon, t, d], i) => (
                                    <div key={t} className={`relative flex items-center gap-6 sm:gap-0 ${i % 2 ? 'sm:flex-row-reverse' : ''}`}>
                                        <div className={`hidden sm:block sm:w-1/2 ${i % 2 ? 'sm:pl-12' : 'sm:pr-12 sm:text-right'}`} data-reveal={i % 2 ? 'right' : 'left'}>
                                            <h4 className="font-display font-bold text-xl text-leaf-950">{t}</h4>
                                            <p className="text-sm text-leaf-900/60 mt-1">{d}</p>
                                        </div>
                                        <div data-reveal="zoom" className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-leaf-900 text-lime-500 flex items-center justify-center shadow-lg sm:absolute sm:left-1/2 sm:-translate-x-1/2"><i className={`fa-solid ${icon}`}></i></div>
                                        <div className="sm:hidden" data-reveal="left">
                                            <h4 className="font-display font-bold text-xl text-leaf-950">{t}</h4>
                                            <p className="text-sm text-leaf-900/60 mt-1">{d}</p>
                                        </div>
                                        <div className="hidden sm:block sm:w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Certificate modal */}
            {modal && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-leaf-950/70 backdrop-blur-md" onClick={e => e.target === e.currentTarget && setModal(false)}>
                    <div className="bg-white rounded-5xl max-w-lg w-full p-8 shadow-2xl relative text-center" style={{ animation: 'logo-pop .5s cubic-bezier(.34,1.56,.64,1)' }}>
                        <button onClick={() => setModal(false)} aria-label="বন্ধ করুন" className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream hover:bg-leaf-900 hover:text-lime-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
                        <div className="relative w-20 h-20 mx-auto rounded-full bg-lime-500 text-leaf-950 flex items-center justify-center text-3xl ring-pulse"><i className="fa-solid fa-certificate"></i></div>
                        <h3 className="font-display font-bold text-2xl text-leaf-950 mt-5">{c.title}</h3>
                        <p className="text-sm text-leaf-900/60 mt-1">সরকারি সার্টিফাইড পরীক্ষাগার কর্তৃক ভেরিফাইড</p>
                        <div className="mt-6 p-6 rounded-3xl border-2 border-dashed border-leaf-600/40 bg-leaf-50">
                            <i className="fa-solid fa-stamp text-5xl text-leaf-600 animate-float"></i>
                            <p className="font-brand font-extrabold text-leaf-900 mt-3 tracking-wider">BCSIR / BSTI VERIFIED</p>
                            <p className="text-xs text-leaf-700 mt-1 font-brand">Certificate Reg No: {c.reg}</p>
                            <p className="text-xs text-leaf-900/50 mt-1">পরীক্ষার তারিখ: {c.date}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
