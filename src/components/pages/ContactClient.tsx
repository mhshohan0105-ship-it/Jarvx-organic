'use client';

import { useState } from 'react';
import { PROMO_CODE } from '@/lib/data';
import { useToast } from '../ToastProvider';
import { delay } from '../ui';

const faqs = [
    ['ডেলিভারি পেতে কত দিন লাগে?', 'ঢাকার ভিতরে সাধারণত ২৪ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি দেওয়া হয়।'],
    ['ডেলিভারি চার্জ কত?', 'ঢাকার ভিতরে ৳৬০ এবং ঢাকার বাইরে সারা বাংলাদেশে ৳১২০।'],
    ['পণ্য খাঁটি কিনা কীভাবে বুঝব?', 'প্রতিটি ব্যাচের সরকারি ল্যাব টেস্ট রিপোর্ট আমাদের "ল্যাব রিপোর্ট" পেজে দেওয়া আছে। এছাড়া পণ্য হাতে পেয়ে দেখে তবেই মূল্য পরিশোধ করতে পারেন।'],
    ['পণ্য পছন্দ না হলে কী করব?', 'ডেলিভারির সময় পণ্য দেখে পছন্দ না হলে সাথে সাথে ফেরত দিতে পারবেন। পরে কোনো সমস্যা হলে ৭ দিনের মধ্যে আমাদের জানান।'],
    ['কোন কোন পেমেন্ট মেথড আছে?', 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ ও রকেট — যেকোনো মাধ্যমে পেমেন্ট করতে পারবেন।'],
    ['প্রোমো কোড কীভাবে ব্যবহার করব?', `কার্ট পেজে "প্রোমো কোড" ঘরে ${PROMO_CODE} লিখে "প্রয়োগ" চাপুন — ১০% ছাড় সাথে সাথে যোগ হবে।`],
];

const channels = [
    { href: 'tel:+8801700000000', icon: 'fa-solid fa-phone', tone: 'bg-lime-500', title: 'ফোন করুন', sub: '+৮৮০ ১৭০০-০০০০০০' },
    { href: '#', icon: 'fa-brands fa-whatsapp', tone: 'bg-gold-500', title: 'WhatsApp', sub: 'দ্রুত উত্তর পান' },
    { href: 'mailto:support@javrvxorganic.com', icon: 'fa-solid fa-envelope', tone: 'bg-lime-500', title: 'ইমেইল', sub: 'support@javrvxorganic.com' },
    { href: '', icon: 'fa-solid fa-location-dot', tone: 'bg-gold-500', title: 'অফিস', sub: 'মিরপুর-১০, ঢাকা-১২১৬' },
];

export default function ContactClient() {
    const toast = useToast();
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <main className="flex-1 bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative">

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channels.map((c, i) => {
                        const body = (
                            <>
                                <span className={`w-12 h-12 rounded-2xl ${c.tone} text-leaf-950 flex items-center justify-center text-xl group-hover:rotate-12 transition-transform`}><i className={c.icon}></i></span>
                                <p className="font-bold text-leaf-950 group-hover:text-white mt-4 transition-colors">{c.title}</p>
                                <p className="text-sm text-leaf-900/60 group-hover:text-lime-500 transition-colors break-all">{c.sub}</p>
                            </>
                        );
                        const cls = 'group p-6 rounded-4xl bg-white border border-leaf-900/5 hover:bg-leaf-900 hover:-translate-y-2 transition-all duration-500';
                        return c.href
                            ? <a key={c.title} href={c.href} data-reveal="up" style={delay(i * 0.1)} className={cls}>{body}</a>
                            : <div key={c.title} data-reveal="up" style={delay(i * 0.1)} className={cls}>{body}</div>;
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-12">
                    {/* Form */}
                    <form onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); toast('ধন্যবাদ! আপনার মেসেজ পাঠানো হয়েছে।'); }} data-reveal="left" className="bg-white rounded-5xl p-6 sm:p-10 border border-leaf-900/5 space-y-4">
                        <h2 className="font-bold text-3xl text-leaf-950">আমাদের মেসেজ পাঠান</h2>
                        <p className="text-sm text-leaf-900/60 -mt-2">সাধারণত ২ ঘণ্টার মধ্যে উত্তর দেওয়া হয়।</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <input required placeholder="আপনার নাম" className="input" />
                            <input type="tel" required placeholder="মোবাইল নম্বর" className="input" />
                        </div>
                        <select className="input">
                            <option>অর্ডার সংক্রান্ত</option>
                            <option>পণ্য সম্পর্কে প্রশ্ন</option>
                            <option>ডেলিভারি</option>
                            <option>রিটার্ন / রিফান্ড</option>
                            <option>হোলসেল / কর্পোরেট অর্ডার</option>
                        </select>
                        <textarea required rows={5} placeholder="আপনার মেসেজ লিখুন..." className="input"></textarea>
                        <button type="submit" className="btn btn-dark w-full py-4">মেসেজ পাঠান <i className="fa-solid fa-paper-plane btn-icon"></i></button>
                    </form>

                    {/* FAQ */}
                    <div data-reveal="right">
                        <p className="eyebrow bg-leaf-900/5 text-leaf-700">সাধারণ প্রশ্ন</p>
                        <h2 className="font-bold text-3xl sm:text-4xl text-leaf-950 mt-4 mb-6">প্রায়ই জিজ্ঞাসিত প্রশ্ন</h2>
                        <div className="space-y-3">
                            {faqs.map(([q, a], i) => (
                                <div key={q} className={`faq ${i === openFaq ? 'open' : ''} bg-white rounded-3xl border border-leaf-900/5 overflow-hidden`}>
                                    <button onClick={() => setOpenFaq(i === openFaq ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left p-5 font-bold text-leaf-950">
                                        <span>{q}</span>
                                        <span className="faq-icon w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center"><i className="fa-solid fa-plus text-sm"></i></span>
                                    </button>
                                    <div className="faq-body"><div className="overflow-hidden"><p className="px-5 pb-5 text-sm text-leaf-900/70 leading-relaxed">{a}</p></div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
