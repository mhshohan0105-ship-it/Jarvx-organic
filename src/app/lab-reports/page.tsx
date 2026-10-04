import type { Metadata } from 'next';
import LabReportsClient from '@/components/pages/LabReportsClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'ল্যাব রিপোর্ট' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-flask-vial" title="ল্যাব টেস্ট রিপোর্ট ও সার্টিফিকেট" crumb="ল্যাব রিপোর্ট" sub="আমরা কথায় নয়, কাজে বিশ্বাসী। প্রতিটি ব্যাচ সরকারি ল্যাবে পরীক্ষা করে তবেই বিক্রি করা হয়।" />
            <LabReportsClient />
        </>
    );
}
