import type { Metadata } from 'next';
import CheckoutClient from '@/components/pages/CheckoutClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'চেকআউট' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-truck-fast" title="চেকআউট" crumb="চেকআউট" />
            <CheckoutClient />
        </>
    );
}
