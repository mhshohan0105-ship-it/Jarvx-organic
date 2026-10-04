'use client';

import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type ToastType = 'success' | 'info' | 'error' | 'love';
type ToastLink = { href: string; label: string };
type ToastData = { id: number; msg: string; type: ToastType; link?: ToastLink };
type ShowToast = (msg: string, type?: ToastType, link?: ToastLink) => void;

const ToastContext = createContext<ShowToast>(() => {});
export const useToast = () => useContext(ToastContext);

const icons: Record<ToastType, string> = {
    success: 'fa-circle-check text-lime-500', info: 'fa-circle-info text-gold-400',
    error: 'fa-circle-exclamation text-red-400', love: 'fa-heart text-red-400',
};

function Toast({ toast, onDone }: { toast: ToastData; onDone: (id: number) => void }) {
    const [phase, setPhase] = useState<'enter' | 'shown' | 'leave'>('enter');
    useEffect(() => {
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('shown')));
        const leave = setTimeout(() => setPhase('leave'), 3500);
        const done = setTimeout(() => onDone(toast.id), 4000);
        return () => { cancelAnimationFrame(raf); clearTimeout(leave); clearTimeout(done); };
    }, [onDone, toast.id]);
    const shown = phase === 'shown';
    return (
        <div className="bg-leaf-950 text-white pl-4 pr-5 py-3.5 rounded-2xl shadow-2xl text-sm flex items-center gap-3 pointer-events-auto border border-white/10 transition-all duration-500"
            style={{ transform: shown ? 'none' : phase === 'enter' ? 'translateX(120%) scale(.9)' : 'translateX(120%)', opacity: shown ? 1 : 0, transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}>
            <i className={`fa-solid ${icons[toast.type] || icons.success} text-lg shrink-0`}></i>
            <span>{toast.msg}</span>
            {toast.link && <Link href={toast.link.href} className="ml-1 shrink-0 font-bold text-lime-500 hover:underline">{toast.link.label}</Link>}
        </div>
    );
}

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const show = useCallback<ShowToast>((msg, type = 'success', link) => {
        setToasts(t => [...t, { id: nextId++, msg, type, link }]);
    }, []);
    const remove = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);

    return (
        <ToastContext.Provider value={show}>
            {children}
            <div className="fixed bottom-5 right-5 z-[70] flex flex-col gap-2 items-end pointer-events-none max-w-[calc(100vw-2.5rem)]">
                {toasts.map(t => <Toast key={t.id} toast={t} onDone={remove} />)}
            </div>
        </ToastContext.Provider>
    );
}
