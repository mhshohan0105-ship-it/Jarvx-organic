// ================= JavrVX Organic — shared layout, cart, helpers & motion =================

// ---------- Storage ----------
const store = {
    get(k, d) { try { const v = localStorage.getItem('javrvx_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('javrvx_' + k, JSON.stringify(v)); } catch {} },
};

// ---------- Helpers ----------
const bnDigits = '০১২৩৪৫৬৭৮৯';
const bn = n => String(n).replace(/\d/g, d => bnDigits[d]);
const taka = n => '৳' + bn(Math.round(n).toLocaleString('en-IN'));
const findProduct = id => productsData.find(p => p.id === id);
const categoryLabel = id => (categories.find(c => c.id === id) || {}).label || '';
const qs = k => new URLSearchParams(location.search).get(k);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

// ---------- Cart ----------
const Cart = {
    items() { return store.get('cart', []).filter(i => findProduct(i.id)); },
    save(items) { store.set('cart', items); updateBadges(); document.dispatchEvent(new Event('cart:change')); },
    add(id, qty = 1, silent = false) {
        const p = findProduct(id);
        if (!p) return;
        const items = this.items();
        const item = items.find(i => i.id === id);
        if (item) item.quantity += qty; else items.push({ id, quantity: qty });
        this.save(items);
        shakeCart();
        if (!silent) showToast(`${p.name} (${p.weight}) কার্টে যোগ হয়েছে`, 'success', { href: 'cart.html', label: 'কার্ট দেখুন' });
    },
    setQty(id, qty) {
        let items = this.items();
        const item = items.find(i => i.id === id);
        if (!item) return;
        item.quantity = qty;
        if (qty <= 0) items = items.filter(i => i.id !== id);
        this.save(items);
    },
    remove(id) { this.save(this.items().filter(i => i.id !== id)); },
    clear() { store.set('bundle', {}); this.save([]); },
    addBundle(plan) {
        const bundle = store.get('bundle', {});
        Object.entries(plan).forEach(([id, q]) => { bundle[id] = (bundle[id] || 0) + q; this.add(id, q, true); });
        store.set('bundle', bundle);
        this.save(this.items());
    },
    count() { return this.items().reduce((s, i) => s + i.quantity, 0); },
    totals(delivery = store.get('delivery', DELIVERY_OPTIONS[0].value)) {
        const items = this.items();
        const subtotal = items.reduce((s, i) => s + findProduct(i.id).price * i.quantity, 0);
        // Package discount applies only to quantities that came from a family package
        const bundle = store.get('bundle', {});
        const bundleDiscount = items.reduce((s, i) => s + findProduct(i.id).price * Math.min(i.quantity, bundle[i.id] || 0) * BUNDLE_DISCOUNT, 0);
        const promo = store.get('promo', false);
        const discount = promo ? (subtotal - bundleDiscount) * PROMO_RATE : 0;
        const ship = items.length ? delivery : 0;
        return { subtotal, bundleDiscount, discount, delivery: ship, total: subtotal - bundleDiscount - discount + ship, promo };
    },
};

// ---------- Wishlist ----------
const Wishlist = {
    items() { return store.get('wishlist', []).filter(id => findProduct(id)); },
    has(id) { return this.items().includes(id); },
    toggle(id) {
        const p = findProduct(id);
        let list = this.items();
        if (list.includes(id)) {
            list = list.filter(x => x !== id);
            showToast(`${p.name} পছন্দের তালিকা থেকে সরানো হয়েছে`, 'info');
        } else {
            list.push(id);
            showToast(`${p.name} পছন্দের তালিকায় যোগ হয়েছে`, 'love', { href: 'wishlist.html', label: 'দেখুন' });
        }
        store.set('wishlist', list);
        updateBadges();
        const liked = list.includes(id);
        document.querySelectorAll(`[data-wish="${id}"]`).forEach(b => {
            b.classList.toggle('text-red-500', liked);
            b.classList.toggle('text-leaf-900', !liked);
            b.querySelector('i').className = `fa-${liked ? 'solid' : 'regular'} fa-heart`;
            b.animate?.([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'cubic-bezier(.34,1.56,.64,1)' });
        });
        document.dispatchEvent(new Event('wishlist:change'));
    },
};

// ---------- Layout ----------
const NAV = [
    { page: 'home',     href: 'index.html',       label: 'হোম' },
    { page: 'products', href: 'products.html',    label: 'পণ্যসমূহ' },
    { page: 'package',  href: 'package.html',     label: 'প্যাকেজ' },
    { page: 'lab',      href: 'lab-reports.html', label: 'ল্যাব রিপোর্ট' },
    { page: 'about',    href: 'about.html',       label: 'আমাদের গল্প' },
    { page: 'reviews',  href: 'reviews.html',     label: 'রিভিউ' },
    { page: 'contact',  href: 'contact.html',     label: 'যোগাযোগ' },
];
const currentPage = document.body.dataset.page;

const logoMark = (size = 'w-10 h-10', text = 'text-xl') => `
    <span class="relative ${size} rounded-2xl bg-lime-500 flex items-center justify-center shadow-lg shadow-lime-500/20 overflow-hidden">
        <i class="fa-solid fa-seedling ${text} text-leaf-900 relative z-10"></i>
        <span class="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gold-500"></span>
    </span>`;

function renderChrome() {
    // Curtain (page transition) + progress bar
    document.body.insertAdjacentHTML('afterbegin', `
        <div id="pageCurtain">
            <div class="curtain-logo flex items-center gap-3">${logoMark('w-14 h-14', 'text-2xl')}
                <span class="font-brand font-extrabold text-3xl text-white">JavrVX <span class="text-lime-500">Organic</span></span>
            </div>
            <div class="curtain-bar"></div>
        </div>
        <div id="scrollProgress"></div>`);

    const header = document.getElementById('site-header');
    if (header) {
        const navLinks = NAV.map(n => `<a href="${n.href}" class="nav-link ${n.page === currentPage ? 'active' : ''}">${n.label}</a>`).join('');
        const mobileLinks = NAV.map((n, i) => `<a href="${n.href}" class="m-link block font-display text-4xl font-bold py-2 ${n.page === currentPage ? 'text-lime-500' : 'text-white hover:text-lime-500'}" style="transition-delay:${0.15 + i * 0.05}s">${n.label}</a>`).join('');
        header.outerHTML = `
        <div id="siteHeader" class="site-header fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4 px-2 sm:px-5">
            <div class="header-shell max-w-7xl mx-auto rounded-full bg-leaf-950/60 backdrop-blur-xl border border-white/10 text-white pl-2.5 pr-1.5 sm:pl-5 sm:pr-2 h-16 flex items-center justify-between gap-2 sm:gap-3">
                <a href="index.html" class="flex items-center gap-2.5 shrink-0 group">
                    <span class="group-hover:rotate-[-8deg] transition-transform duration-500">${logoMark()}</span>
                    <span class="font-brand font-extrabold text-base sm:text-xl tracking-tight leading-none">JavrVX<span class="text-lime-500 hidden min-[420px]:inline"> Organic</span></span>
                </a>
                <nav class="hidden xl:flex items-center gap-6 text-sm text-white/75 font-medium">${navLinks}</nav>
                <div class="flex items-center gap-1.5 sm:gap-2">
                    <form onsubmit="submitSearch(event)" class="relative hidden md:block group">
                        <input type="search" name="q" oninput="liveSearch(this.value)" value="${esc(qs('q') || '')}" placeholder="খুঁজুন..."
                            class="search-input w-36 focus:w-56 transition-all duration-500 bg-white/10 text-xs text-white placeholder-white/50 rounded-full py-2.5 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-white/10">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-xs text-white/60"></i>
                    </form>
                    <a href="wishlist.html" aria-label="পছন্দের তালিকা" class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors ${currentPage === 'wishlist' ? 'text-lime-500' : 'text-white/80'}">
                        <i class="fa-regular fa-heart text-lg"></i>
                        <span id="wishlistBadge" class="absolute top-1 right-1 bg-gold-500 text-leaf-950 text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">০</span>
                    </a>
                    <a href="cart.html" id="cartIcon" aria-label="কার্ট" class="relative h-10 sm:h-11 pl-3 pr-2 sm:pl-4 sm:pr-3 bg-lime-500 hover:bg-white text-leaf-950 rounded-full transition-colors flex items-center gap-2 font-bold text-sm">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span id="cartBadge" class="bg-leaf-950 text-lime-500 text-[11px] min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center">০</span>
                    </a>
                    <button id="menuBtn" onclick="toggleMenu()" aria-label="মেনু" class="xl:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-white/10 flex items-center justify-center relative z-[60]">
                        <i class="fa-solid fa-bars-staggered text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
        <div id="mobileMenu" class="fixed inset-0 z-[55] mesh-bg grain xl:hidden flex flex-col justify-center px-8 pointer-events-none">
            <form onsubmit="submitSearch(event)" class="relative mb-8 md:hidden">
                <input type="search" name="q" oninput="liveSearch(this.value)" placeholder="পণ্য খুঁজুন..." class="search-input w-full bg-white/10 text-white placeholder-white/50 rounded-full py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-lime-500 border border-white/10">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-4 text-white/60"></i>
            </form>
            ${mobileLinks}
            <p class="text-white/50 text-sm mt-10"><i class="fa-solid fa-phone mr-2 text-lime-500"></i>০১৭০০-০০০০০০</p>
        </div>`;
    }

    const footer = document.getElementById('site-footer');
    if (footer) {
        const catLinks = categories.filter(c => c.id !== 'All').map(c => `<li><a href="products.html?cat=${c.id}" class="hover:text-lime-500 hover:pl-1 transition-all">${c.label}</a></li>`).join('');
        footer.outerHTML = `
        <section class="relative z-10 pt-10 pb-0 px-4">
            <div data-reveal="zoom" class="relative max-w-6xl mx-auto rounded-5xl bg-gold-500 overflow-hidden px-6 py-12 sm:p-14 text-leaf-950">
                <div class="blob w-72 h-72 bg-lime-500 -top-20 -left-10 animate-blob"></div>
                <div class="blob w-72 h-72 bg-gold-300 -bottom-24 right-0 animate-blob" style="animation-delay:-5s"></div>
                <div class="relative grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p class="eyebrow bg-leaf-950/10 text-leaf-900">নিউজলেটার</p>
                        <h2 class="text-3xl sm:text-4xl font-bold mt-4 leading-tight">নতুন অফার ও স্বাস্থ্য টিপস সবার আগে পান</h2>
                    </div>
                    <form onsubmit="event.preventDefault(); this.reset(); showToast('সাবস্ক্রাইব করার জন্য ধন্যবাদ!')" class="flex flex-col sm:flex-row gap-3 bg-white/40 backdrop-blur p-2 rounded-3xl sm:rounded-full">
                        <input type="email" required placeholder="আপনার ইমেইল ঠিকানা" class="flex-1 px-5 py-3.5 rounded-full text-sm bg-white border-0 focus:outline-none focus:ring-2 focus:ring-leaf-800">
                        <button type="submit" class="btn btn-dark px-7 py-3.5 text-sm">সাবস্ক্রাইব <i class="fa-solid fa-arrow-right btn-icon"></i></button>
                    </form>
                </div>
            </div>
        </section>
        <footer class="relative z-0 bg-leaf-950 text-white/70 -mt-24 pt-40 pb-8 overflow-hidden grain">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
                    <div class="space-y-5 lg:col-span-4">
                        <a href="index.html" class="flex items-center gap-3">${logoMark()}<span class="font-brand font-extrabold text-2xl text-white">JavrVX <span class="text-lime-500">Organic</span></span></a>
                        <p class="text-sm leading-relaxed max-w-sm">বাংলাদেশে রাসায়নিক ও ভেজালমুক্ত খাঁটি খাদ্য পণ্য সরবরাহে প্রতিশ্রুতিবদ্ধ একটি অনলাইন এগ্রো ব্র্যান্ড।</p>
                        <div class="flex gap-2.5">
                            ${['facebook-f', 'instagram', 'youtube', 'whatsapp'].map(i => `<a href="#" aria-label="${i}" class="w-10 h-10 rounded-full border border-white/15 hover:bg-lime-500 hover:text-leaf-950 hover:-translate-y-1 flex items-center justify-center transition-all"><i class="fa-brands fa-${i}"></i></a>`).join('')}
                        </div>
                    </div>
                    <div class="lg:col-span-3">
                        <h4 class="text-white font-bold mb-4">ক্যাটাগরি</h4>
                        <ul class="space-y-2.5 text-sm">${catLinks}</ul>
                    </div>
                    <div class="lg:col-span-2">
                        <h4 class="text-white font-bold mb-4">দ্রুত লিংক</h4>
                        <ul class="space-y-2.5 text-sm">
                            ${NAV.slice(2).map(n => `<li><a href="${n.href}" class="hover:text-lime-500 hover:pl-1 transition-all">${n.label}</a></li>`).join('')}
                            <li><a href="cart.html" class="hover:text-lime-500 hover:pl-1 transition-all">আমার কার্ট</a></li>
                        </ul>
                    </div>
                    <div class="lg:col-span-3">
                        <h4 class="text-white font-bold mb-4">যোগাযোগ</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="flex gap-3"><i class="fa-solid fa-location-dot text-lime-500 mt-1"></i> মিরপুর-১০, ঢাকা-১২১৬</li>
                            <li class="flex gap-3"><i class="fa-solid fa-phone text-lime-500 mt-1"></i> +৮৮০ ১৭০০-০০০০০০</li>
                            <li class="flex gap-3"><i class="fa-solid fa-envelope text-lime-500 mt-1"></i> support@javrvxorganic.com</li>
                            <li class="flex gap-3"><i class="fa-solid fa-clock text-lime-500 mt-1"></i> প্রতিদিন সকাল ৯টা - রাত ১০টা</li>
                        </ul>
                    </div>
                </div>
                <div class="font-brand font-extrabold text-outline text-[18vw] lg:text-[190px] leading-none text-center select-none -mb-4" data-parallax="-0.08">JavrVX</div>
                <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                    <span>© ২০২৬ JavrVX Organic। সর্বস্বত্ব সংরক্ষিত।</span>
                    <span class="flex items-center gap-3 text-lg text-white/60"><i class="fa-solid fa-hand-holding-dollar" title="Cash on Delivery"></i><i class="fa-solid fa-mobile-screen-button" title="bKash / Nagad"></i><i class="fa-solid fa-shield-halved" title="Secure"></i></span>
                </div>
            </div>
        </footer>
        <button id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="উপরে যান"
            class="fixed bottom-5 left-5 z-40 w-12 h-12 rounded-full bg-leaf-900 text-lime-500 shadow-xl flex items-center justify-center opacity-0 translate-y-4 pointer-events-none transition-all duration-500">
            <svg class="absolute inset-0 -rotate-90" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="none" stroke="rgba(197,240,74,.2)" stroke-width="2"/><circle id="bttRing" cx="24" cy="24" r="22" fill="none" stroke="#C5F04A" stroke-width="2" stroke-dasharray="138.2" stroke-dashoffset="138.2" stroke-linecap="round"/></svg>
            <i class="fa-solid fa-arrow-up relative"></i>
        </button>
        <div id="toastContainer" class="fixed bottom-5 right-5 z-[70] flex flex-col gap-2 items-end pointer-events-none max-w-[calc(100vw-2.5rem)]"></div>`;
    }

    // Inner page banner: <section id="pageBanner" data-title data-sub data-crumb data-icon>
    const banner = document.getElementById('pageBanner');
    if (banner) {
        const { title, sub, crumb, icon } = banner.dataset;
        banner.className = 'relative mesh-bg grain text-white pt-36 pb-24 sm:pt-44 sm:pb-28 overflow-hidden';
        banner.setAttribute('data-leaves', '8');
        banner.innerHTML = `
            <div class="blob w-80 h-80 bg-lime-500/40 -top-20 -left-20 animate-blob"></div>
            <div class="blob w-96 h-96 bg-gold-500/40 -bottom-40 right-0 animate-blob" style="animation-delay:-6s"></div>
            ${icon ? `<i class="fa-solid ${icon} absolute right-[6%] top-1/2 -translate-y-1/2 text-[180px] sm:text-[260px] text-white/[0.04] animate-float-slow hidden sm:block"></i>` : ''}
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <nav data-reveal="up" class="inline-flex items-center gap-2 text-xs text-white/60 glass rounded-full px-4 py-2 mb-6">
                    <a href="index.html" class="hover:text-lime-500"><i class="fa-solid fa-house"></i> হোম</a>
                    <i class="fa-solid fa-chevron-right text-[8px] opacity-60"></i>
                    <span class="text-lime-500">${crumb || title}</span>
                </nav>
                <h1 class="split font-bold text-4xl sm:text-6xl leading-[1.1] max-w-4xl">${title}</h1>
                ${sub ? `<p data-reveal="up" style="--d:.35s" class="text-white/70 text-base sm:text-lg mt-5 max-w-2xl">${sub}</p>` : ''}
            </div>
            <svg class="wave-divider absolute bottom-0 inset-x-0" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="#F7F4EC" d="M0,40 C240,80 480,0 720,20 C960,40 1200,70 1440,30 L1440,60 L0,60 Z"/></svg>`;
    }
}

function toggleMenu(force) {
    const menu = document.getElementById('mobileMenu');
    const open = force ?? !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menu.classList.toggle('pointer-events-none', !open);
    document.getElementById('menuBtn').innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars-staggered'} text-lg"></i>`;
    document.body.style.overflow = open ? 'hidden' : '';
}

function updateBadges() {
    const c = document.getElementById('cartBadge');
    const w = document.getElementById('wishlistBadge');
    if (c) c.textContent = bn(Cart.count());
    if (w) w.textContent = bn(Wishlist.items().length);
}

function shakeCart() {
    const icon = document.getElementById('cartIcon');
    if (!icon) return;
    icon.classList.remove('cart-shake');
    void icon.offsetWidth;
    icon.classList.add('cart-shake');
}

// Fly a product image into the cart icon, then add
function flyToCart(sourceImg, done) {
    const target = document.getElementById('cartIcon');
    if (!sourceImg || !target || reduceMotion) return done();
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

function addFromCard(btn, id) {
    const card = btn.closest('.p-card');
    const imgEl = card && card.querySelector('.p-img');
    btn.classList.add('added');
    btn.querySelector('i').className = 'fa-solid fa-check';
    flyToCart(imgEl, () => Cart.add(id));
    setTimeout(() => { btn.classList.remove('added'); btn.querySelector('i').className = 'fa-solid fa-plus'; }, 1600);
}

// ---------- Search ----------
function liveSearch(q) {
    document.querySelectorAll('.search-input').forEach(i => { if (i.value !== q) i.value = q; });
    document.dispatchEvent(new CustomEvent('search', { detail: q }));
}
function submitSearch(e) {
    e.preventDefault();
    const q = new FormData(e.target).get('q').trim();
    if (currentPage === 'products') { toggleMenu(false); return liveSearch(q); }
    navigate('products.html' + (q ? '?q=' + encodeURIComponent(q) : ''));
}
function matchesSearch(p, q) {
    q = q.trim().toLowerCase();
    return !q || p.name.includes(q) || p.en.toLowerCase().includes(q) || p.description.includes(q) || categoryLabel(p.category).includes(q);
}

// ---------- Cards ----------
function productCard(p, i = 0) {
    const liked = Wishlist.has(p.id);
    return `
    <div class="p-card bg-white rounded-4xl p-2.5 border border-leaf-900/5 flex flex-col" data-tilt data-reveal="up" style="--d:${(i % 4) * 0.08}s">
        <div class="relative rounded-[1.6rem] overflow-hidden aspect-square bg-gradient-to-br from-gold-100 to-leaf-50">
            <a href="product.html?id=${p.id}" aria-label="${esc(p.en)}"><img src="${p.image}" alt="${esc(p.en)}" loading="lazy" class="p-img w-full h-full object-cover"></a>
            <span class="absolute top-3 left-3 glass-light text-leaf-900 text-[10px] font-bold px-3 py-1.5 rounded-full">${p.tag}</span>
            <button onclick="Wishlist.toggle('${p.id}')" data-wish="${p.id}" aria-label="পছন্দের তালিকা"
                class="absolute top-3 right-3 w-9 h-9 rounded-full glass-light flex items-center justify-center hover:scale-110 transition-transform ${liked ? 'text-red-500' : 'text-leaf-900'}">
                <i class="fa-${liked ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <span class="absolute bottom-3 left-3 bg-leaf-950/80 backdrop-blur text-lime-500 text-[11px] font-bold px-3 py-1.5 rounded-full">${p.weight}</span>
        </div>
        <div class="px-2.5 pt-4 pb-2 flex-1 flex flex-col">
            <p class="text-[10px] font-bold text-leaf-600 uppercase tracking-widest">${categoryLabel(p.category)}</p>
            <a href="product.html?id=${p.id}" class="mt-1"><h3 class="font-bold text-[17px] text-leaf-950 leading-snug hover:text-leaf-600 transition-colors">${p.name}</h3></a>
            <p class="text-[11px] text-leaf-900/40 font-brand mt-0.5">${p.en}</p>
            <div class="flex items-center justify-between mt-auto pt-4">
                <span class="font-display font-bold text-2xl text-leaf-950">${taka(p.price)}</span>
                <button onclick="addFromCard(this,'${p.id}')" aria-label="কার্টে যোগ করুন" class="add-btn h-11 min-w-11 px-3.5 rounded-full bg-leaf-900 text-lime-500 hover:text-leaf-950 hover:bg-lime-500 flex items-center justify-center gap-2 font-bold text-xs">
                    <i class="fa-solid fa-plus"></i><span class="add-label">কার্টে যোগ</span>
                </button>
            </div>
        </div>
        <div class="p-glare"></div>
    </div>`;
}

function reviewCard(r, opts = {}) {
    const p = findProduct(r.product);
    return `
    <div class="${opts.marquee ? 'w-[320px] sm:w-[380px] shrink-0' : ''} bg-white p-6 rounded-4xl border border-leaf-900/5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-500" ${opts.marquee ? '' : 'data-reveal="up"'}>
        <div>
            <div class="flex items-center justify-between">
                <div class="flex text-gold-500 text-xs gap-0.5">${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}${'<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating)}</div>
                <i class="fa-solid fa-quote-right text-2xl text-lime-500"></i>
            </div>
            <p class="text-leaf-950/80 text-[15px] leading-relaxed mt-3">${esc(r.text)}</p>
            ${p ? `<a href="product.html?id=${p.id}" class="inline-flex items-center gap-1.5 mt-4 text-[11px] font-semibold text-leaf-700 bg-leaf-50 px-3 py-1 rounded-full hover:bg-lime-500 hover:text-leaf-950 transition-colors"><i class="fa-solid fa-tag"></i>${p.name} · ${p.weight}</a>` : ''}
        </div>
        <div class="flex items-center gap-3 mt-6 pt-4 border-t border-leaf-900/5">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-leaf-700 to-leaf-900 text-lime-500 font-bold flex items-center justify-center">${esc(r.name[0])}</div>
            <div>
                <p class="text-sm font-bold text-leaf-950">${esc(r.name)}</p>
                <p class="text-[11px] text-leaf-900/50">${esc(r.loc)} · <i class="fa-solid fa-circle-check text-leaf-600"></i> ভেরিফাইড</p>
            </div>
        </div>
    </div>`;
}

// ---------- Toast ----------
function showToast(msg, type = 'success', link) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: 'fa-circle-check text-lime-500', info: 'fa-circle-info text-gold-400', error: 'fa-circle-exclamation text-red-400', love: 'fa-heart text-red-400' };
    const toast = document.createElement('div');
    toast.className = 'bg-leaf-950 text-white pl-4 pr-5 py-3.5 rounded-2xl shadow-2xl text-sm flex items-center gap-3 pointer-events-auto border border-white/10 transition-all duration-500';
    toast.style.cssText = 'transform: translateX(120%) scale(.9); opacity: 0; transition-timing-function: cubic-bezier(.34,1.56,.64,1)';
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} text-lg shrink-0"></i><span></span>`;
    toast.querySelector('span').textContent = msg;
    if (link) toast.insertAdjacentHTML('beforeend', `<a href="${link.href}" class="ml-1 shrink-0 font-bold text-lime-500 hover:underline">${link.label}</a>`);
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => { toast.style.transform = 'none'; toast.style.opacity = '1'; }));
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

// ---------- Modal ----------
function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    if (!document.querySelector('.modal:not(.hidden)')) document.body.style.overflow = '';
}

// =====================================================================
// Motion engine
// =====================================================================

// Page transitions
function navigate(href) {
    const curtain = document.getElementById('pageCurtain');
    if (!curtain || reduceMotion) return (location.href = href);
    curtain.classList.add('enter');
    setTimeout(() => (location.href = href), 480);
}
document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href');
    if (a.target === '_blank' || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || a.hasAttribute('download')) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    e.preventDefault();
    navigate(url.href);
});
window.addEventListener('pageshow', e => { if (e.persisted) document.getElementById('pageCurtain')?.classList.remove('enter'); });

// Split headline words for the rise-in effect
function splitText(root = document) {
    root.querySelectorAll('.split:not([data-split])').forEach(el => {
        el.dataset.split = '1';
        let i = 0;
        const walk = node => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) return frag.append(part);
                        const w = document.createElement('span');
                        w.className = 'word';
                        w.innerHTML = `<span style="transition-delay:${(i++ * 0.06).toFixed(2)}s">${esc(part)}</span>`;
                        frag.append(w);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1 && !child.classList.contains('rotator') && child.tagName !== 'BR') {
                    walk(child);
                } else if (child.nodeType === 1 && child.classList.contains('rotator')) {
                    const w = document.createElement('span');
                    w.className = 'word';
                    child.replaceWith(w);
                    const inner = document.createElement('span');
                    inner.style.transitionDelay = (i++ * 0.06).toFixed(2) + 's';
                    inner.append(child);
                    w.append(inner);
                }
            });
        };
        walk(el);
    });
}

// Reveal-on-scroll (auto-picks up dynamically rendered content)
const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    io.unobserve(el);
    const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
    setTimeout(() => {
        el.classList.add('in');
        if (el.dataset.count !== undefined) countUp(el);
    }, delay * 1000);
}), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

function observe(root = document) {
    splitText(root);
    root.querySelectorAll('[data-reveal]:not(.in), .split:not(.in), .underline-draw:not(.in), [data-count]:not(.in)').forEach(el => {
        if (!io || reduceMotion) { el.classList.add('in'); if (el.dataset.count !== undefined) el.textContent = bn(Number(el.dataset.count).toLocaleString('en-IN')); return; }
        io.observe(el);
    });
    root.querySelectorAll('[data-leaves]:not([data-leaves-done])').forEach(spawnLeaves);
}
new MutationObserver(muts => {
    if (muts.some(m => [...m.addedNodes].some(n => n.nodeType === 1))) observe();
}).observe(document.documentElement, { childList: true, subtree: true });

function countUp(el) {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const step = now => {
        const k = Math.min(1, (now - start) / 1800);
        el.textContent = bn(Math.floor(target * (1 - Math.pow(1 - k, 4))).toLocaleString('en-IN'));
        if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function spawnLeaves(el) {
    el.dataset.leavesDone = '1';
    if (reduceMotion) return;
    const n = +el.dataset.leaves || 6;
    for (let i = 0; i < n; i++) {
        const leaf = document.createElement('i');
        leaf.className = 'fa-solid fa-leaf leaf-particle';
        leaf.style.cssText = `left:${Math.random() * 100}%;top:0;font-size:${10 + Math.random() * 14}px;animation-duration:${12 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s`;
        el.appendChild(leaf);
    }
}

// Rotating words: <span class="rotator"><span>..</span><span>..</span></span>
function initRotators() {
    document.querySelectorAll('.rotator').forEach(r => {
        const items = [...r.children];
        let i = 0;
        items[0].classList.add('on');
        if (reduceMotion || items.length < 2) return;
        setInterval(() => {
            items[i].classList.replace('on', 'off');
            const prev = items[i];
            setTimeout(() => prev.classList.remove('off'), 700);
            i = (i + 1) % items.length;
            items[i].classList.add('on');
        }, 2200);
    });
}

// 3D tilt + glare (delegated, so works for re-rendered cards)
if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', e => {
        const card = e.target.closest('[data-tilt]');
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
        card.style.setProperty('--gx', x * 100 + '%');
        card.style.setProperty('--gy', y * 100 + '%');
    });
    document.addEventListener('pointerout', e => {
        const card = e.target.closest('[data-tilt]');
        if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
    });

    // Magnetic buttons
    document.addEventListener('pointermove', e => {
        const m = e.target.closest('[data-magnetic]');
        if (!m) return;
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    document.addEventListener('pointerout', e => {
        const m = e.target.closest('[data-magnetic]');
        if (m && !m.contains(e.relatedTarget)) m.style.transform = '';
    });

    // Mouse depth parallax inside [data-depth-root]
    document.addEventListener('pointermove', e => {
        document.querySelectorAll('[data-depth-root]').forEach(root => {
            const r = root.getBoundingClientRect();
            if (e.clientY < r.top || e.clientY > r.bottom) return;
            const x = (e.clientX / innerWidth - 0.5), y = ((e.clientY - r.top) / r.height - 0.5);
            root.querySelectorAll('[data-depth]').forEach(el => {
                const d = +el.dataset.depth;
                el.style.translate = `${x * d * 60}px ${y * d * 60}px`;
            });
        });
    });
}

// Scroll-driven: header, progress, back-to-top, parallax
let ticking = false;
function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? y / max : 0;
    document.getElementById('scrollProgress')?.style.setProperty('transform', `scaleX(${p})`);
    document.getElementById('siteHeader')?.classList.toggle('scrolled', y > 40);
    const btt = document.getElementById('backToTop');
    if (btt) {
        const show = y > 500;
        btt.classList.toggle('opacity-0', !show);
        btt.classList.toggle('translate-y-4', !show);
        btt.classList.toggle('pointer-events-none', !show);
        document.getElementById('bttRing')?.setAttribute('stroke-dashoffset', 138.2 * (1 - p));
    }
    if (!reduceMotion) document.querySelectorAll('[data-parallax]').forEach(el => {
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.parallax;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal:not(.hidden)').forEach(m => closeModal(m.id));
    if (document.getElementById('mobileMenu')?.classList.contains('open')) toggleMenu(false);
});
addEventListener('storage', updateBadges);

// ---------- Init ----------
renderChrome();
updateBadges();
document.addEventListener('DOMContentLoaded', () => { observe(); initRotators(); onScroll(); });
