import Link from 'next/link';
import { CategoryAccordion, FeaturedProducts } from '@/components/home';
import { CountUp, Leaves, Rotator, Split } from '@/components/motion';
import { delay, ReviewCard } from '@/components/ui';
import { img, IMG, PROMO_CODE, reviewsData } from '@/lib/data';
import { bn } from '@/lib/format';

const ticker = ['১০০% খাঁটি', 'ল্যাব টেস্টেড', 'ক্যাশ অন ডেলিভারি', `${PROMO_CODE} কোডে ১০% ছাড়`, 'সুন্দরবনের মধু', 'মদিনার আজওয়া', 'দেশি গাওয়া ঘি', '৬৪ জেলায় ডেলিভারি'];

const features = [
    ['fa-vial-circle-check', 'ল্যাব টেস্ট নিশ্চিত', 'BCSIR থেকে পরীক্ষিত', 'bg-gold-100 text-gold-600'],
    ['fa-truck-fast', 'ক্যাশ অন ডেলিভারি', '৬৪ জেলায় হোম ডেলিভারি', 'bg-leaf-50 text-leaf-700'],
    ['fa-rotate-left', 'মানি-ব্যাক গ্যারান্টি', 'পছন্দ না হলে রিটার্ন', 'bg-gold-100 text-gold-600'],
    ['fa-hand-holding-heart', 'সোর্স থেকে সরাসরি', 'কোনো মধ্যস্বত্বভোগী নেই', 'bg-leaf-50 text-leaf-700'],
];

const stats = [[30000, '+', 'সন্তুষ্ট পরিবার', 'text-lime-500'], [42, '', 'খাঁটি পণ্য', 'text-gold-400'], [64, '', 'জেলায় ডেলিভারি', 'text-lime-500'], [500, '+', 'কৃষক ও মৌয়াল', 'text-gold-400']] as const;

const steps = [
    ['fa-hand-holding-droplet', 'সংগ্রহ', 'সুন্দরবন, মদিনা ও দেশের কৃষকদের কাছ থেকে সরাসরি সংগ্রহ'],
    ['fa-flask-vial', 'ল্যাব টেস্ট', 'প্রতিটি ব্যাচ BCSIR/BSTI ল্যাবে পরীক্ষা করা হয়'],
    ['fa-box-open', 'যত্নে প্যাকেজিং', 'ফুড-গ্রেড কাচের বোতল ও এয়ারটাইট প্যাক'],
    ['fa-truck-fast', 'দ্রুত ডেলিভারি', 'ঢাকায় ২৪ ঘণ্টা, সারা দেশে ২-৩ দিনে'],
];

const half = Math.ceil(reviewsData.length / 2);
const reviewRows = [
    { list: reviewsData.slice(0, half), anim: 'animate-marquee' },
    { list: reviewsData.slice(half), anim: 'animate-marquee-rev' },
];

export default function HomePage() {
    return (
        <main className="flex-1">

            {/* ============ HERO ============ */}
            <section className="relative mesh-bg grain text-white pt-32 lg:pt-36 overflow-hidden" data-depth-root>
                <Leaves n={10} />
                <div className="blob w-[28rem] h-[28rem] bg-lime-500/30 -top-32 -left-32 animate-blob"></div>
                <div className="blob w-[30rem] h-[30rem] bg-gold-500/30 top-40 -right-40 animate-blob" style={{ animationDelay: '-7s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-10 items-center pb-20 lg:pb-28">
                    <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left">
                        <p data-reveal="down" className="eyebrow glass text-lime-500">১০০% প্রাকৃতিক · ল্যাব টেস্টেড</p>
                        <Split as="h1" aria-label="খাঁটি মধু, খেজুর, গাওয়া ঘি, মসলা ও সুপারফুড — প্রকৃতি থেকে সরাসরি আপনার ঘরে" className="font-bold text-[2.6rem] leading-[1.08] sm:text-6xl xl:text-7xl mt-6">
                            খাঁটি <Rotator className="text-shine" words={['মধু', 'খেজুর', 'গাওয়া ঘি', 'মসলা', 'সুপারফুড']} /><br />
                            প্রকৃতি থেকে সরাসরি আপনার ঘরে
                        </Split>
                        <p data-reveal="up" style={delay(.5)} className="text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mt-6 leading-relaxed">
                            সুন্দরবনের মধু, মদিনার আজওয়া খেজুর, দেশি গাওয়া ঘি থেকে অর্গানিক সুপারফুড — প্রতিটি ব্যাচ ল্যাবে পরীক্ষিত, সারা দেশে ক্যাশ অন ডেলিভারি।
                        </p>
                        <div data-reveal="up" style={delay(.65)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mt-9">
                            <Link href="/products" data-magnetic className="btn btn-lime w-full sm:w-auto px-8 py-4 text-base">কেনাকাটা শুরু করুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                            <Link href="/package" data-magnetic className="btn btn-ghost w-full sm:w-auto px-8 py-4 text-base"><i className="fa-solid fa-people-roof text-lime-500"></i> পারিবারিক প্যাকেজ</Link>
                        </div>
                        <div data-reveal="up" style={delay(.8)} className="flex items-center justify-center lg:justify-start gap-4 mt-10">
                            <div className="flex -space-x-3">
                                <span className="w-10 h-10 rounded-full border-2 border-leaf-900 bg-gold-500 text-leaf-950 font-bold flex items-center justify-center">না</span>
                                <span className="w-10 h-10 rounded-full border-2 border-leaf-900 bg-lime-500 text-leaf-950 font-bold flex items-center justify-center">র</span>
                                <span className="w-10 h-10 rounded-full border-2 border-leaf-900 bg-white text-leaf-950 font-bold flex items-center justify-center">ত</span>
                                <span className="w-10 h-10 rounded-full border-2 border-leaf-900 bg-leaf-600 text-white text-xs font-bold flex items-center justify-center">+</span>
                            </div>
                            <div className="text-left">
                                <p className="font-display font-bold text-xl"><CountUp to={30000} />+ পরিবার</p>
                                <p className="text-xs text-white/60"><span className="text-gold-400">★★★★★</span> আমাদের উপর আস্থা রাখেন</p>
                            </div>
                        </div>
                    </div>

                    {/* Orbit composition */}
                    <div className="lg:col-span-6 xl:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[520px]" data-reveal="zoom" style={delay(.2)}>
                        <div className="absolute inset-0 m-auto w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed border-white/20 animate-spin-slow"></div>
                        <div className="absolute inset-0 m-auto w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-white/10 animate-spin-rev">
                            <span className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-lime-500 shadow-[0_0_20px_#C5F04A]"></span>
                            <span className="absolute bottom-10 left-6 w-2 h-2 rounded-full bg-gold-400"></span>
                        </div>
                        <div data-depth="0.3" className="absolute inset-0 m-auto w-[230px] h-[230px] sm:w-[310px] sm:h-[310px] rounded-full overflow-hidden border-[6px] border-white/10 shadow-2xl transition-[translate] duration-300 ease-out">
                            <img src={img(IMG.sundarban, 700)} alt="Sundarban Honey" className="w-full h-full object-cover scale-110" />
                        </div>

                        <Link href="/products/jv-12" data-depth="0.8" className="absolute top-2 left-0 sm:left-4 transition-[translate] duration-300 ease-out">
                            <div className="animate-float glass-light rounded-3xl p-2 pr-4 flex items-center gap-3 shadow-2xl text-leaf-950">
                                <img src={img(IMG.ajwaL, 160)} alt="Ajwa Dates" className="w-14 h-14 rounded-2xl object-cover" />
                                <div><p className="text-xs font-bold">আজওয়া খেজুর</p><p className="font-display font-bold text-leaf-700">৳২,২০০</p></div>
                            </div>
                        </Link>
                        <Link href="/products/jv-22" data-depth="1.1" className="absolute bottom-6 right-0 sm:right-2 transition-[translate] duration-300 ease-out">
                            <div className="animate-float glass-light rounded-3xl p-2 pr-4 flex items-center gap-3 shadow-2xl text-leaf-950" style={{ animationDelay: '-3s' }}>
                                <img src={img(IMG.ghee, 160)} alt="Gawa Ghee" className="w-14 h-14 rounded-2xl object-cover" />
                                <div><p className="text-xs font-bold">খাঁটি গাওয়া ঘি</p><p className="font-display font-bold text-leaf-700">৳১,৯৯০</p></div>
                            </div>
                        </Link>
                        <div data-depth="0.6" className="absolute top-10 right-2 sm:right-8 transition-[translate] duration-300 ease-out">
                            <div className="relative w-20 h-20 rounded-full bg-lime-500 text-leaf-950 flex flex-col items-center justify-center font-bold shadow-xl animate-float-slow">
                                <span className="text-[10px] leading-none">ল্যাব</span><span className="text-sm leading-tight">টেস্টেড</span>
                                <i className="fa-solid fa-flask-vial text-xs"></i>
                            </div>
                        </div>
                        <div data-depth="0.5" className="absolute bottom-10 left-2 sm:left-10 transition-[translate] duration-300 ease-out">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 shadow-xl animate-float" style={{ animationDelay: '-1.5s' }}><img src={img(IMG.turmeric, 160)} alt="Turmeric" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </div>

                {/* Ticker */}
                <div className="relative z-10 bg-lime-500 text-leaf-950 py-4 shadow-2xl">
                    <div className="marquee">
                        {[false, true].map(hidden => (
                            <div key={String(hidden)} className="marquee-track animate-marquee font-display font-bold text-lg sm:text-xl whitespace-nowrap" aria-hidden={hidden || undefined}>
                                {ticker.map(t => <span key={t} className="flex items-center gap-6">{t}<i className="fa-solid fa-seedling text-base"></i></span>)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ FEATURES ============ */}
            <section className="bg-cream pt-10 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map(([icon, title, sub, tone], i) => (
                        <div key={title} data-reveal="up" style={delay(i * 0.1)} className="group p-5 sm:p-6 rounded-4xl bg-white border border-leaf-900/5 hover:bg-leaf-900 hover:-translate-y-2 transition-all duration-500">
                            <span className={`w-14 h-14 rounded-2xl ${tone} group-hover:bg-lime-500 group-hover:text-leaf-950 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center text-2xl`}><i className={`fa-solid ${icon}`}></i></span>
                            <h4 className="font-display font-bold text-lg text-leaf-950 group-hover:text-white mt-4 transition-colors">{title}</h4>
                            <p className="text-xs sm:text-sm text-leaf-900/60 group-hover:text-white/60 mt-1 transition-colors">{sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ CATEGORIES ============ */}
            <section className="bg-cream py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <p data-reveal="up" className="eyebrow bg-leaf-900/5 text-leaf-700">ক্যাটাগরি</p>
                            <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4 leading-tight">আপনার প্রয়োজন অনুযায়ী <span className="underline-draw">বেছে নিন</span></Split>
                        </div>
                        <p data-reveal="up" className="text-leaf-900/60 max-w-sm">যেকোনো ক্যাটাগরির উপর মাউস রাখুন বা ট্যাপ করুন — তারপর সরাসরি সেই পণ্যগুলো দেখুন।</p>
                    </div>
                    <CategoryAccordion />
                </div>
            </section>

            {/* ============ BEST SELLERS (tabbed) ============ */}
            <section className="bg-white py-16 sm:py-20 rounded-t-5xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FeaturedProducts />
                    <div className="text-center mt-12" data-reveal="up">
                        <Link href="/products" data-magnetic className="btn btn-dark px-8 py-4">সব ৪২টি পণ্য দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                    </div>
                </div>
            </section>

            {/* ============ STATS BAND ============ */}
            <section className="relative bg-leaf-950 text-white py-20 overflow-hidden grain">
                <img src={img('1500937386664-56d1dfef3854', 1600)} alt="" className="absolute inset-0 w-full h-[130%] object-cover opacity-20" data-parallax="0.15" />
                <div className="absolute inset-0 bg-gradient-to-r from-leaf-950 via-leaf-950/80 to-leaf-950/40"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map(([n, plus, label, tone], i) => (
                        <div key={label} data-reveal="up" style={delay(i * 0.1)}><p className={`font-display font-bold text-5xl sm:text-6xl ${tone}`}><CountUp to={n} />{plus}</p><p className="text-white/60 mt-2">{label}</p></div>
                    ))}
                </div>
            </section>

            {/* ============ PROCESS ============ */}
            <section className="bg-cream py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p data-reveal="up" className="eyebrow bg-leaf-900/5 text-leaf-700">কীভাবে কাজ করি</p>
                        <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4">সোর্স থেকে আপনার দরজা পর্যন্ত</Split>
                    </div>
                    <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-leaf-900/10 overflow-hidden">
                            <div data-reveal="left" className="h-full bg-gradient-to-r from-lime-500 to-gold-500 origin-left" style={{ transitionDuration: '2s' }}></div>
                        </div>
                        {steps.map(([icon, title, desc], i) => (
                            <div key={title} data-reveal="up" style={delay(i * 0.15)} className="relative text-center group">
                                <div className="relative mx-auto w-20 h-20 rounded-full bg-white border-4 border-cream shadow-lg flex items-center justify-center text-2xl text-leaf-700 group-hover:bg-lime-500 group-hover:text-leaf-950 group-hover:scale-110 transition-all duration-500">
                                    <i className={`fa-solid ${icon}`}></i>
                                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-500 text-leaf-950 text-xs font-bold flex items-center justify-center">{bn(i + 1)}</span>
                                </div>
                                <h4 className="font-display font-bold text-xl text-leaf-950 mt-5">{title}</h4>
                                <p className="text-sm text-leaf-900/60 mt-2 max-w-[220px] mx-auto">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PACKAGE + LAB ============ */}
            <section className="bg-cream pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
                    <Link href="/package" data-reveal="left" className="group relative overflow-hidden rounded-5xl bg-leaf-900 text-white p-8 sm:p-12 min-h-[340px] flex flex-col justify-end">
                        <img src={img(IMG.mustard, 900)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-leaf-950 via-leaf-950/60 to-transparent"></div>
                        <div className="relative">
                            <span className="inline-flex w-14 h-14 rounded-2xl bg-lime-500 text-leaf-950 items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500"><i className="fa-solid fa-people-roof"></i></span>
                            <h3 className="font-bold text-3xl sm:text-4xl mt-5">মাসিক পারিবারিক প্যাকেজ</h3>
                            <p className="text-white/70 mt-2 max-w-md">পরিবারের সদস্য অনুযায়ী মাসের বাজার হিসাব করুন — সাথে ৫% প্যাকেজ ছাড়।</p>
                            <span className="inline-flex items-center gap-2 mt-6 text-lime-500 font-bold group-hover:gap-4 transition-all">ক্যালকুলেটর খুলুন <i className="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </Link>
                    <Link href="/lab-reports" data-reveal="right" className="group relative overflow-hidden rounded-5xl bg-gold-500 text-leaf-950 p-8 sm:p-12 min-h-[340px] flex flex-col justify-end">
                        <div className="blob w-72 h-72 bg-lime-500 -top-24 -right-16 animate-blob opacity-70"></div>
                        <i className="fa-solid fa-flask-vial absolute top-8 right-10 text-[120px] text-leaf-950/10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700"></i>
                        <div className="relative">
                            <span className="inline-flex w-14 h-14 rounded-2xl bg-leaf-950 text-lime-500 items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500"><i className="fa-solid fa-certificate"></i></span>
                            <h3 className="font-bold text-3xl sm:text-4xl mt-5">ল্যাব টেস্ট রিপোর্ট</h3>
                            <p className="text-leaf-950/70 mt-2 max-w-md">আমরা কথায় নয়, কাজে বিশ্বাসী। প্রতিটি ব্যাচের সরকারি ল্যাব রিপোর্ট দেখুন।</p>
                            <span className="inline-flex items-center gap-2 mt-6 font-bold group-hover:gap-4 transition-all">রিপোর্ট দেখুন <i className="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ============ REVIEWS MARQUEE ============ */}
            <section className="bg-leaf-50 py-16 sm:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <p data-reveal="up" className="eyebrow bg-white text-leaf-700">গ্রাহক মতামত</p>
                        <Split className="font-bold text-4xl sm:text-5xl text-leaf-950 mt-4">গ্রাহকরা যা বলছেন</Split>
                    </div>
                    <Link href="/reviews" data-reveal="up" className="btn btn-dark px-6 py-3 text-sm self-start md:self-auto">সব রিভিউ <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                </div>
                <div className="space-y-5">
                    {reviewRows.map(({ list, anim }) => (
                        <div key={anim} className="marquee">
                            {[false, true].map(hidden => (
                                <div key={String(hidden)} className={`marquee-track ${anim}`} aria-hidden={hidden || undefined}>
                                    {list.concat(list).map((r, i) => <ReviewCard key={i} r={r} marquee />)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
