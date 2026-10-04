import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/pages/ProductsClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'সকল পণ্য' };

export default function ProductsPage() {
    return (
        <>
            <PageBanner icon="fa-basket-shopping" title="খাঁটি পণ্যের সম্পূর্ণ তালিকা" crumb="পণ্যসমূহ" sub="মধু, খেজুর, তেল-ঘি, মসলা, অর্গানিক হেলথ পণ্য ও বাদাম — ৪২টি বাছাইকৃত পণ্য।" />
            <main className="flex-1 bg-cream pb-20">
                <Suspense fallback={null}><ProductsClient /></Suspense>
            </main>
        </>
    );
}
