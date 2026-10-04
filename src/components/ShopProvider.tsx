'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BUNDLE_DISCOUNT, DELIVERY_OPTIONS, PROMO_RATE } from '@/lib/data';
import { findProduct } from '@/lib/format';
import { shakeCart } from '@/lib/motion';
import { useToast } from './ToastProvider';

// ---------- Storage (same keys as the old static site) ----------
export const store = {
    get<T>(k: string, d: T): T { try { const v = localStorage.getItem('javrvx_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k: string, v: unknown) { try { localStorage.setItem('javrvx_' + k, JSON.stringify(v)); } catch {} },
};

export type CartItem = { id: string; quantity: number };
type Bundle = Record<string, number>;

type Shop = {
    ready: boolean;
    cart: CartItem[];
    wishlist: string[];
    bundle: Bundle;
    delivery: number;
    promo: boolean;
    count: number;
    totals: { subtotal: number; bundleDiscount: number; discount: number; delivery: number; total: number; promo: boolean };
    add: (id: string, qty?: number, silent?: boolean) => void;
    setQty: (id: string, qty: number) => void;
    remove: (id: string) => void;
    clear: () => void;
    addBundle: (plan: Bundle) => void;
    toggleWish: (id: string) => void;
    setDelivery: (v: number) => void;
    setPromo: (on: boolean) => void;
};

const ShopContext = createContext<Shop | null>(null);
export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx) throw new Error('useShop must be used inside ShopProvider');
    return ctx;
}

export function ShopProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const [ready, setReady] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [bundle, setBundle] = useState<Bundle>({});
    const [delivery, setDeliveryState] = useState(DELIVERY_OPTIONS[0].value);
    const [promo, setPromoState] = useState(false);

    // Load from localStorage after hydration, and stay in sync with other tabs
    useEffect(() => {
        const load = () => {
            setCart(store.get<CartItem[]>('cart', []).filter(i => findProduct(i.id)));
            setWishlist(store.get<string[]>('wishlist', []).filter(id => findProduct(id)));
            setBundle(store.get<Bundle>('bundle', {}));
            setDeliveryState(store.get('delivery', DELIVERY_OPTIONS[0].value));
            setPromoState(store.get('promo', false));
        };
        load();
        setReady(true);
        addEventListener('storage', load);
        return () => removeEventListener('storage', load);
    }, []);

    const saveCart = useCallback((items: CartItem[]) => { store.set('cart', items); setCart(items); }, []);
    const saveBundle = useCallback((b: Bundle) => { store.set('bundle', b); setBundle(b); }, []);

    // Read the stored cart (not the render snapshot) so delayed/overlapping updates don't clobber each other
    const currentCart = () => store.get<CartItem[]>('cart', []).filter(i => findProduct(i.id));

    const add = useCallback((id: string, qty = 1, silent = false) => {
        const p = findProduct(id);
        if (!p) return;
        const items = currentCart();
        const item = items.find(i => i.id === id);
        if (item) item.quantity += qty; else items.push({ id, quantity: qty });
        saveCart(items);
        shakeCart();
        if (!silent) toast(`${p.name} (${p.weight}) কার্টে যোগ হয়েছে`, 'success', { href: '/cart', label: 'কার্ট দেখুন' });
    }, [saveCart, toast]);

    const setQty = useCallback((id: string, qty: number) => {
        const items = currentCart();
        saveCart(qty <= 0 ? items.filter(i => i.id !== id) : items.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }, [saveCart]);

    const remove = useCallback((id: string) => {
        saveCart(currentCart().filter(i => i.id !== id));
        const { [id]: _, ...rest } = store.get<Bundle>('bundle', {});
        saveBundle(rest);
    }, [saveCart, saveBundle]);

    const clear = useCallback(() => { saveBundle({}); saveCart([]); }, [saveCart, saveBundle]);

    const addBundle = useCallback((plan: Bundle) => {
        const items = currentCart();
        const b = store.get<Bundle>('bundle', {});
        Object.entries(plan).forEach(([id, q]) => {
            b[id] = (b[id] || 0) + q;
            const item = items.find(i => i.id === id);
            if (item) item.quantity += q; else items.push({ id, quantity: q });
        });
        saveBundle(b);
        saveCart(items);
        shakeCart();
    }, [saveCart, saveBundle]);

    const toggleWish = useCallback((id: string) => {
        const p = findProduct(id);
        if (!p) return;
        const has = wishlist.includes(id);
        const list = has ? wishlist.filter(x => x !== id) : [...wishlist, id];
        if (has) toast(`${p.name} পছন্দের তালিকা থেকে সরানো হয়েছে`, 'info');
        else toast(`${p.name} পছন্দের তালিকায় যোগ হয়েছে`, 'love', { href: '/wishlist', label: 'দেখুন' });
        store.set('wishlist', list);
        setWishlist(list);
    }, [wishlist, toast]);

    const setDelivery = useCallback((v: number) => { store.set('delivery', v); setDeliveryState(v); }, []);
    const setPromo = useCallback((on: boolean) => { store.set('promo', on); setPromoState(on); }, []);

    const totals = useMemo(() => {
        const subtotal = cart.reduce((s, i) => s + findProduct(i.id)!.price * i.quantity, 0);
        // Package discount applies only to quantities that came from a family package
        const bundleDiscount = cart.reduce((s, i) => s + findProduct(i.id)!.price * Math.min(i.quantity, bundle[i.id] || 0) * BUNDLE_DISCOUNT, 0);
        const discount = promo ? (subtotal - bundleDiscount) * PROMO_RATE : 0;
        const ship = cart.length ? delivery : 0;
        return { subtotal, bundleDiscount, discount, delivery: ship, total: subtotal - bundleDiscount - discount + ship, promo };
    }, [cart, bundle, promo, delivery]);

    const value: Shop = {
        ready, cart, wishlist, bundle, delivery, promo, totals,
        count: cart.reduce((s, i) => s + i.quantity, 0),
        add, setQty, remove, clear, addBundle, toggleWish, setDelivery, setPromo,
    };
    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
