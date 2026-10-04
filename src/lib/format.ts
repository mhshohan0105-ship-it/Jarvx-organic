import { categories, productsData, type Product } from './data';

const bnDigits = '০১২৩৪৫৬৭৮৯';
export const bn = (n: string | number) => String(n).replace(/\d/g, d => bnDigits[+d]);
export const taka = (n: number) => '৳' + bn(Math.round(n).toLocaleString('en-IN'));
export const findProduct = (id: string | null | undefined) => productsData.find(p => p.id === id);
export const categoryLabel = (id: string) => categories.find(c => c.id === id)?.label || '';

export function matchesSearch(p: Product, q: string) {
    q = q.trim().toLowerCase();
    return !q || p.name.includes(q) || p.en.toLowerCase().includes(q) || p.description.includes(q) || categoryLabel(p.category).includes(q);
}
