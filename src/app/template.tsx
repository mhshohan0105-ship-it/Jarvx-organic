import type { ReactNode } from 'react';
import { LogoMark } from '@/components/ui';

// Re-mounts on every navigation, so the curtain lifts off each new page
export default function Template({ children }: { children: ReactNode }) {
    return (
        <>
            <div id="pageCurtain">
                <div className="curtain-logo flex items-center gap-3">
                    <LogoMark size="w-14 h-14" text="text-2xl" />
                    <span className="font-brand font-extrabold text-3xl text-white">JavrVX <span className="text-lime-500">Organic</span></span>
                </div>
                <div className="curtain-bar"></div>
            </div>
            {children}
        </>
    );
}
