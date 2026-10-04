import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MotionEngine from '@/components/MotionEngine';
import { ShopProvider } from '@/components/ShopProvider';
import { ToastProvider } from '@/components/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
    title: { default: 'JavrVX Organic - খাঁটি ও নিরাপদ অর্গানিক ফুড', template: '%s - JavrVX Organic' },
    description: 'JavrVX Organic - সুন্দরবনের মধু, আজওয়া খেজুর, গাওয়া ঘি, সরিষার তেল ও অর্গানিক হেলথ পণ্য। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="bn" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet" />
            </head>
            <body className="min-h-screen flex flex-col" suppressHydrationWarning>
                <div id="scrollProgress"></div>
                <ToastProvider>
                    <ShopProvider>
                        <Header />
                        {children}
                        <Footer />
                    </ShopProvider>
                </ToastProvider>
                <Suspense fallback={null}><MotionEngine /></Suspense>
            </body>
        </html>
    );
}
