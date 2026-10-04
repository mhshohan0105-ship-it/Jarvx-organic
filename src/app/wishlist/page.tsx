import type { Metadata } from 'next';
import WishlistClient from '@/components/pages/WishlistClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'পছন্দের তালিকা' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-heart" title="আপনার পছন্দের তালিকা" crumb="পছন্দের তালিকা" sub="যেসব পণ্যে ❤️ দিয়েছেন সেগুলো এখানে সংরক্ষিত আছে।" />
            <WishlistClient />
        </>
    );
}
