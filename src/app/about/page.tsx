import type { Metadata } from 'next';
import Link from 'next/link';
import { CountUp, Leaves, Split } from '@/components/motion';
import { delay, PageBanner } from '@/components/ui';
import { img, IMG } from '@/lib/data';

export const metadata: Metadata = { title: 'আমাদের গল্প' };

const points = [
    ['fa-route', 'সোর্স থেকে সরাসরি', 'কোনো মধ্যস্বত্বভোগী নেই, তাই মান ও দাম দুটোই নিয়ন্ত্রণে।', 'bg-lime-500 text-leaf-950'],
    ['fa-flask-vial', 'প্রতি ব্যাচে ল্যাব টেস্ট', 'রিপোর্ট ছাড়া কোনো পণ্য বিক্রি হয় না।', 'bg-gold-500 text-leaf-950'],
    ['fa-recycle', 'পরিবেশবান্ধব প্যাকেজিং', 'ফুড-গ্রেড কাচের বোতল ও পুনর্ব্যবহারযোগ্য প্যাক।', 'bg-leaf-900 text-lime-500'],
];

const sources = [
    ['সুন্দরবন', 'খাঁটি চাকের মধু', IMG.wild, 'Honey'],
    ['মদিনা ও আল-কাসিম', 'আজওয়া ও সুক্কারি খেজুর', IMG.ajwaL, 'Dates'],
    ['পাবনা ও সিরাজগঞ্জ', 'গাওয়া ঘি ও সরিষার তেল', IMG.ghee, 'OilGhee'],
    ['শ্রীলঙ্কা (সিলন)', 'নারিকেল ভিনেগার ও সুগার', IMG.coconutSugar, 'Health'],
];

const stats = [[30000, '+', 'সন্তুষ্ট পরিবার'], [500, '+', 'কৃষক ও মৌয়াল'], [42, '', 'খাঁটি পণ্য'], [64, '', 'জেলায় ডেলিভারি']] as const;

export default function AboutPage() {
    return (
        <>
            <PageBanner icon="fa-seedling" title="ভেজালের ভিড়ে খাঁটি খাবারের প্রতিশ্রুতি" crumb="আমাদের গল্প" sub="যেভাবে একটি ছোট উদ্যোগ আজ হাজারো পরিবারের আস্থার নাম।" />
            <main className="flex-1 bg-cream">

                {/* Story */}
                <section className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
                        <div className="relative h-[460px] sm:h-[540px]">
                            <div data-reveal="left" className="absolute left-0 top-0 w-[62%] h-[78%] rounded-5xl overflow-hidden shadow-2xl">
                                <img src={img('1500937386664-56d1dfef3854', 900)} alt="Farm field" className="w-full h-[120%] object-cover" data-parallax="0.08" />
                            </div>
                            <div data-reveal="right" style={delay(.15)} className="absolute right-0 bottom-0 w-[55%] h-[62%] rounded-5xl overflow-hidden shadow-2xl border-8 border-cream">
                                <img src={img(IMG.sundarban, 700)} alt="Honey" className="w-full h-[120%] object-cover" data-parallax="-0.08" />
                            </div>
                            <div data-reveal="zoom" style={delay(.35)} className="absolute left-[38%] top-[62%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-lime-500 text-leaf-950 flex flex-col items-center justify-center shadow-2xl">
                                <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 128 128"><defs><path id="circ" d="M64,64 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" /></defs><text fontSize="11" fontWeight="700" fill="#06201A" letterSpacing="2"><textPath href="#circ">JAVRVX ORGANIC • 100% PURE • </textPath></text></svg>
                                <i className="fa-solid fa-leaf text-3xl"></i>
                            </div>
                        </div>
                        <div>
                            <p data-reveal="up" className="eyebrow bg-leaf-900/5 text-leaf-700">আমাদের যাত্রা</p>
                            <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4 leading-tight">খাঁটি খাবার পাওয়া <span className="underline-draw">বিলাসিতা নয়</span>, অধিকার</Split>
                            <p data-reveal="up" style={delay(.2)} className="text-leaf-900/70 text-lg leading-relaxed mt-6">
                                বাজারে ভেজাল খাবারের দুশ্চিন্তা থেকেই JavrVX Organic এর যাত্রা। আমরা সুন্দরবনের মৌয়াল, দেশের কৃষক ও খামারি এবং বিশ্বস্ত আন্তর্জাতিক উৎসের সাথে সরাসরি কাজ করি — যাতে আপনি পান আসল স্বাদ, আর উৎপাদক পান ন্যায্য মূল্য।
                            </p>
                            <ul className="mt-8 space-y-4">
                                {points.map(([icon, title, sub, tone], i) => (
                                    <li key={title} data-reveal="up" style={delay(0.3 + i * 0.1)} className="flex gap-4"><span className={`w-11 h-11 rounded-2xl ${tone} flex items-center justify-center shrink-0`}><i className={`fa-solid ${icon}`}></i></span><div><p className="font-bold text-leaf-950">{title}</p><p className="text-sm text-leaf-900/60">{sub}</p></div></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Sources */}
                <section className="relative mesh-bg grain text-white py-20 sm:py-28 overflow-hidden rounded-5xl mx-2 sm:mx-4">
                    <Leaves n={6} />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <p data-reveal="up" className="eyebrow glass text-lime-500">আমাদের উৎস</p>
                                <Split className="font-bold text-4xl sm:text-5xl mt-4">যেখান থেকে আসে আপনার খাবার</Split>
                            </div>
                            <p data-reveal="up" className="text-white/60 max-w-sm">প্রতিটি পণ্যের পেছনে আছে একটি নির্দিষ্ট জায়গা আর কিছু যত্নশীল মানুষ।</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {sources.map(([place, what, im, cat], i) => (
                                <Link key={place} href={`/products?cat=${cat}`} data-reveal="up" style={delay(i * 0.1)} className="group relative h-80 rounded-4xl overflow-hidden">
                                    <img src={img(im, 600)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-leaf-950 via-leaf-950/30 to-transparent"></div>
                                    <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-lime-500 text-leaf-950 flex items-center justify-center ring-pulse"><i className="fa-solid fa-location-dot"></i></span>
                                    <div className="absolute bottom-0 inset-x-0 p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="font-bold text-2xl">{place}</h3>
                                        <p className="text-white/70 text-sm">{what}</p>
                                        <span className="inline-flex items-center gap-2 text-lime-500 text-sm font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">পণ্য দেখুন <i className="fa-solid fa-arrow-right"></i></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-20">
                            {stats.map(([n, plus, label], i) => (
                                <div key={label} data-reveal="up" style={delay(i * 0.1)}><p className="font-display font-extrabold text-5xl text-leaf-950"><CountUp to={n} />{plus}</p><p className="text-leaf-900/60 mt-1">{label}</p></div>
                            ))}
                        </div>

                        <div data-reveal="zoom" className="relative overflow-hidden rounded-5xl bg-lime-500 p-10 sm:p-16 text-center">
                            <div className="blob w-80 h-80 bg-gold-400 -top-32 -left-20 animate-blob"></div>
                            <div className="blob w-80 h-80 bg-white -bottom-32 -right-20 animate-blob" style={{ animationDelay: '-5s' }}></div>
                            <div className="relative">
                                <i className="fa-solid fa-quote-left text-4xl text-leaf-900/30"></i>
                                <p className="font-display font-bold text-2xl sm:text-4xl text-leaf-950 mt-4 max-w-3xl mx-auto leading-snug">“আমাদের নিজের পরিবারকে যা খাওয়াই না, তা কখনো আপনার পরিবারের কাছে পাঠাই না।”</p>
                                <p className="mt-5 font-bold text-leaf-900">— JavrVX Organic টিম</p>
                                <Link href="/products" data-magnetic className="btn btn-dark px-8 py-4 mt-8">আমাদের পণ্য দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
