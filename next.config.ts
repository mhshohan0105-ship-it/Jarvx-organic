import type { NextConfig } from 'next';

// Old .html links (bookmarks, shared links) keep working after the move to Next.js
const pages = ['products', 'package', 'lab-reports', 'about', 'reviews', 'contact', 'cart', 'checkout', 'wishlist'];

const nextConfig: NextConfig = {
    async redirects() {
        return [
            { source: '/index.html', destination: '/', permanent: true },
            { source: '/product.html', has: [{ type: 'query', key: 'id', value: '(?<id>.+)' }], destination: '/products/:id', permanent: true },
            { source: '/product.html', destination: '/products', permanent: true },
            ...pages.map(p => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
        ];
    },
};

export default nextConfig;
