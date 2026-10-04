// Imperative motion helpers shared by client components

export const reduceMotion = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function shakeCart() {
    const icon = document.getElementById('cartIcon');
    if (!icon) return;
    icon.classList.remove('cart-shake');
    void icon.offsetWidth;
    icon.classList.add('cart-shake');
}

// Fly a product image into the cart icon, then run `done`
export function flyToCart(sourceImg: HTMLImageElement | null | undefined, done: () => void) {
    const target = document.getElementById('cartIcon');
    if (!sourceImg || !target || reduceMotion()) return done();
    const s = sourceImg.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const size = Math.min(s.width, 140);
    const clone = document.createElement('img');
    clone.src = sourceImg.currentSrc || sourceImg.src;
    clone.className = 'fly-img';
    Object.assign(clone.style, { left: s.left + s.width / 2 - size / 2 + 'px', top: s.top + s.height / 2 - size / 2 + 'px', width: size + 'px', height: size + 'px' });
    document.body.appendChild(clone);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        const dx = t.left + t.width / 2 - (s.left + s.width / 2);
        const dy = t.top + t.height / 2 - (s.top + s.height / 2);
        clone.style.transform = `translate(${dx}px, ${dy}px) scale(.15) rotate(360deg)`;
        clone.style.opacity = '.4';
    }));
    setTimeout(() => { clone.remove(); done(); }, 850);
}

// Page transition: drop the curtain, then let the router navigate
type Router = { push: (href: string) => void };
export function navigateWithCurtain(router: Router, href: string) {
    const curtain = document.getElementById('pageCurtain');
    if (!curtain || reduceMotion()) return router.push(href);
    curtain.classList.add('enter');
    setTimeout(() => router.push(href), 480);
}

export function confetti() {
    if (reduceMotion()) return;
    const colors = ['#C5F04A', '#F5A524', '#FFC857', '#3C9A74', '#ffffff'];
    for (let i = 0; i < 80; i++) {
        const c = document.createElement('span');
        c.className = 'confetti';
        c.style.cssText = `left:${Math.random() * 100}vw;background:${colors[i % colors.length]};border-radius:${Math.random() > .5 ? '50%' : '2px'};--x:${(Math.random() - .5) * 300}px;--r:${Math.random() * 900}deg;animation-duration:${2 + Math.random() * 2}s;animation-delay:${Math.random() * .5}s`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }
}
