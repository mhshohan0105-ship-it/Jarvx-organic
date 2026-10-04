'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';
import { NAV } from './Header';
import { useToast } from './ToastProvider';
import { LogoMark } from './ui';

export default function Footer() {
    const toast = useToast();
    return (
        <>
            <section className="relative z-10 pt-10 pb-0 px-4">
                <div data-reveal="zoom" className="relative max-w-6xl mx-auto rounded-5xl bg-gold-500 overflow-hidden px-6 py-12 sm:p-14 text-leaf-950">
                    <div className="blob w-72 h-72 bg-lime-500 -top-20 -left-10 animate-blob"></div>
                    <div className="blob w-72 h-72 bg-gold-300 -bottom-24 right-0 animate-blob" style={{ animationDelay: '-5s' }}></div>
                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="eyebrow bg-leaf-950/10 text-leaf-900">নিউজলেটার</p>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">নতুন অফার ও স্বাস্থ্য টিপস সবার আগে পান</h2>
                        </div>
                        <form onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); toast('সাবস্ক্রাইব করার জন্য ধন্যবাদ!'); }} className="flex flex-col sm:flex-row gap-3 bg-white/40 backdrop-blur p-2 rounded-3xl sm:rounded-full">
                            <input type="email" required placeholder="আপনার ইমেইল ঠিকানা" className="flex-1 px-5 py-3.5 rounded-full text-sm bg-white border-0 focus:outline-none focus:ring-2 focus:ring-leaf-800" />
                            <button type="submit" className="btn btn-dark px-7 py-3.5 text-sm">সাবস্ক্রাইব <i className="fa-solid fa-arrow-right btn-icon"></i></button>
                        </form>
                    </div>
                </div>
            </section>
            <footer className="relative z-0 bg-leaf-950 text-white/70 -mt-24 pt-40 pb-8 overflow-hidden grain">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
                        <div className="space-y-5 lg:col-span-4">
                            <Link href="/" className="flex items-center gap-3"><LogoMark /><span className="font-brand font-extrabold text-2xl text-white">JavrVX <span className="text-lime-500">Organic</span></span></Link>
                            <p className="text-sm leading-relaxed max-w-sm">বাংলাদেশে রাসায়নিক ও ভেজালমুক্ত খাঁটি খাদ্য পণ্য সরবরাহে প্রতিশ্রুতিবদ্ধ একটি অনলাইন এগ্রো ব্র্যান্ড।</p>
                            <div className="flex gap-2.5">
                                {['facebook-f', 'instagram', 'youtube', 'whatsapp'].map(i => (
                                    <a key={i} href="#" aria-label={i} className="w-10 h-10 rounded-full border border-white/15 hover:bg-lime-500 hover:text-leaf-950 hover:-translate-y-1 flex items-center justify-center transition-all"><i className={`fa-brands fa-${i}`}></i></a>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            <h4 className="text-white font-bold mb-4">ক্যাটাগরি</h4>
                            <ul className="space-y-2.5 text-sm">
                                {categories.filter(c => c.id !== 'All').map(c => <li key={c.id}><Link href={`/products?cat=${c.id}`} className="hover:text-lime-500 hover:pl-1 transition-all">{c.label}</Link></li>)}
                            </ul>
                        </div>
                        <div className="lg:col-span-2">
                            <h4 className="text-white font-bold mb-4">দ্রুত লিংক</h4>
                            <ul className="space-y-2.5 text-sm">
                                {NAV.slice(2).map(n => <li key={n.href}><Link href={n.href} className="hover:text-lime-500 hover:pl-1 transition-all">{n.label}</Link></li>)}
                                <li><Link href="/cart" className="hover:text-lime-500 hover:pl-1 transition-all">আমার কার্ট</Link></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3">
                            <h4 className="text-white font-bold mb-4">যোগাযোগ</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-3"><i className="fa-solid fa-location-dot text-lime-500 mt-1"></i> মিরপুর-১০, ঢাকা-১২১৬</li>
                                <li className="flex gap-3"><i className="fa-solid fa-phone text-lime-500 mt-1"></i> +৮৮০ ১৭০০-০০০০০০</li>
                                <li className="flex gap-3"><i className="fa-solid fa-envelope text-lime-500 mt-1"></i> support@javrvxorganic.com</li>
                                <li className="flex gap-3"><i className="fa-solid fa-clock text-lime-500 mt-1"></i> প্রতিদিন সকাল ৯টা - রাত ১০টা</li>
                            </ul>
                        </div>
                    </div>
                    <div className="font-brand font-extrabold text-outline text-[18vw] lg:text-[190px] leading-none text-center select-none -mb-4" data-parallax="-0.08">JavrVX</div>
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                        <span>© ২০২৬ JavrVX Organic। সর্বস্বত্ব সংরক্ষিত।</span>
                        <span className="flex items-center gap-3 text-lg text-white/60"><i className="fa-solid fa-hand-holding-dollar" title="Cash on Delivery"></i><i className="fa-solid fa-mobile-screen-button" title="bKash / Nagad"></i><i className="fa-solid fa-shield-halved" title="Secure"></i></span>
                    </div>
                </div>
            </footer>
            <button id="backToTop" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="উপরে যান"
                className="fixed bottom-5 left-5 z-40 w-12 h-12 rounded-full bg-leaf-900 text-lime-500 shadow-xl flex items-center justify-center opacity-0 translate-y-4 pointer-events-none transition-all duration-500">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="none" stroke="rgba(197,240,74,.2)" strokeWidth="2" /><circle id="bttRing" cx="24" cy="24" r="22" fill="none" stroke="#C5F04A" strokeWidth="2" strokeDasharray="138.2" strokeDashoffset="138.2" strokeLinecap="round" /></svg>
                <i className="fa-solid fa-arrow-up relative"></i>
            </button>
        </>
    );
}
