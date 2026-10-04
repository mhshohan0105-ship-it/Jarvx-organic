import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'যোগাযোগ' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-headset" title="আমরা শুনছি — যোগাযোগ করুন" crumb="যোগাযোগ" sub="অর্ডার, পণ্য বা ডেলিভারি নিয়ে যেকোনো প্রশ্নে আমাদের টিম প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত আছে।" />
            <ContactClient />
        </>
    );
}
