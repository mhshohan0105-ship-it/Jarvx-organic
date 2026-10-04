import type { Metadata } from 'next';
import ReviewsClient from '@/components/pages/ReviewsClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'গ্রাহক রিভিউ' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-comments" title="গ্রাহকরা যা বলছেন" crumb="রিভিউ" sub="সারা দেশের সন্তুষ্ট পরিবারের সত্যিকারের অভিজ্ঞতা। আপনার মতামতও জানান!" />
            <ReviewsClient />
        </>
    );
}
