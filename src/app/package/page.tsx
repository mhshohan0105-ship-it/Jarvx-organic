import type { Metadata } from 'next';
import PackageClient from '@/components/pages/PackageClient';
import { PageBanner } from '@/components/ui';

export const metadata: Metadata = { title: 'পারিবারিক প্যাকেজ' };

export default function Page() {
    return (
        <>
            <PageBanner icon="fa-people-roof" title="মাসিক পারিবারিক অর্গানিক বাজার" crumb="পারিবারিক প্যাকেজ" sub="পরিবারের সদস্য সংখ্যা বেছে নিন, প্রয়োজনমতো পরিমাণ বদলান — পুরো প্যাকেজে পাবেন ৫% ছাড়।" />
            <PackageClient />
        </>
    );
}
