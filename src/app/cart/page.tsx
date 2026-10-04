import type { Metadata } from 'next';
import CartClient from '@/components/pages/CartClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'শপিং কার্ট' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-bag-shopping" title="আপনার শপিং কার্ট" crumb="কার্ট" />
            <CartClient />
        </>
    );
}
