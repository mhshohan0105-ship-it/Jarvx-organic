import type { Metadata } from 'next';
import Link from 'next/link';
import ProductDetail from '@/components/pages/ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import { Split } from '@/components/motion';
import { productsData } from '@/lib/data';
import { categoryLabel, findProduct } from '@/lib/format';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return productsData.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const p = findProduct((await params).id);
    return p ? { title: `${p.name} (${p.weight})`, description: p.details || p.description } : { title: 'পণ্য পাওয়া যায়নি' };
}

export default async function ProductPage({ params }: Props) {
    const product = findProduct((await params).id);

    const related = product ? productsData.filter(p => p.category === product.category && p.group !== product.group) : [];
    const fill = related.length >= 4 ? related : related.concat(productsData.filter(p => p.category !== product?.category));

    return (
        <main className="flex-1 bg-cream">
            <section className="relative pt-28 sm:pt-32 pb-16 overflow-hidden">
                <div className="blob w-[34rem] h-[34rem] bg-lime-500/25 -top-40 -left-40 animate-blob"></div>
                <div className="blob w-[30rem] h-[30rem] bg-gold-400/30 top-20 -right-40 animate-blob" style={{ animationDelay: '-6s' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {product ? (
                        <>
                            <nav data-reveal="down" className="text-xs text-leaf-900/50 mb-8 flex flex-wrap items-center gap-2">
                                <Link href="/" className="hover:text-leaf-700">হোম</Link><i className="fa-solid fa-chevron-right text-[8px]"></i>
                                <Link href="/products" className="hover:text-leaf-700">পণ্যসমূহ</Link><i className="fa-solid fa-chevron-right text-[8px]"></i>
                                <Link href={`/products?cat=${product.category}`} className="hover:text-leaf-700">{categoryLabel(product.category)}</Link><i className="fa-solid fa-chevron-right text-[8px]"></i>
                                <span className="text-leaf-950 font-semibold">{product.name}</span>
                            </nav>
                            <ProductDetail key={product.id} product={product} />
                        </>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-5xl">
                            <div className="w-24 h-24 mx-auto rounded-full bg-cream flex items-center justify-center text-4xl text-leaf-900/30 animate-float"><i className="fa-solid fa-box-open"></i></div>
                            <p className="font-display font-bold text-2xl text-leaf-950 mt-6">দুঃখিত, পণ্যটি পাওয়া যায়নি</p>
                            <Link href="/products" className="btn btn-dark px-6 py-3 mt-6">সব পণ্য দেখুন <i className="fa-solid fa-arrow-right btn-icon"></i></Link>
                        </div>
                    )}
                </div>
            </section>

            {product && (
                <section className="py-16 bg-white rounded-t-5xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p data-reveal="up" className="eyebrow bg-leaf-900/5 text-leaf-700">আরও দেখুন</p>
                        <Split className="font-bold text-3xl sm:text-4xl text-leaf-950 mt-4 mb-8">একই ক্যাটাগরির অন্যান্য পণ্য</Split>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {fill.slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
