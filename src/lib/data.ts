// ================= JavrVX Organic — shared data =================

export type Product = {
    id: string; category: string; group: string; name: string; en: string; weight: string;
    price: number; tag: string; description: string; image: string; details?: string; benefits?: string[];
};
export type Review = { text: string; name: string; loc: string; rating: number; product: string };
export type Cert = {
    key: string; icon: string; tone: string; lab: string; title: string; summary: string; reg: string; date: string;
    results: [string, string, string, number][];
};
type Row = [string, string, string, string, string, string, number, string, string, string];

export const img = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = [
    { id: 'All',    label: 'সব পণ্য',              icon: 'fa-border-all' },
    { id: 'Honey',  label: '🍯 মধু',                icon: 'fa-jar' },
    { id: 'Dates',  label: '🌴 খেজুর',              icon: 'fa-tree' },
    { id: 'OilGhee',label: '🧈 তেল ও ঘি',          icon: 'fa-bottle-droplet' },
    { id: 'Spice',  label: '🌶️ মসলা, আটা ও ডাল',   icon: 'fa-pepper-hot' },
    { id: 'Health', label: '🌿 অর্গানিক ও হেলথ',   icon: 'fa-leaf' },
    { id: 'Nuts',   label: '🥜 বাদাম',              icon: 'fa-seedling' },
];

// Shared info for every size/variant of the same product
export const groupInfo: Record<string, { details: string; benefits: string[] }> = {
    'sundarban-honey': { details: 'সুন্দরবনের গভীর বন থেকে মৌয়ালদের সংগৃহীত প্রাকৃতিক চাকের মধু। কোনো চিনি, সিরাপ বা প্রিজারভেটিভ মেশানো হয় না।', benefits: ['রোগ প্রতিরোধ ক্ষমতা বাড়ায়', 'ঠান্ডা-কাশিতে উপকারী', 'প্রাকৃতিক শক্তির উৎস'] },
    'blackseed-honey': { details: 'কালোজিরা ফুলের ক্ষেত থেকে সংগৃহীত গাঢ় রঙের মধু। স্বাদে হালকা ঝাঁঝালো, ঔষধি গুণে ভরপুর।', benefits: ['রোগ প্রতিরোধে সহায়ক', 'হজমশক্তি বাড়ায়', 'অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ'] },
    'lychee-honey':    { details: 'দিনাজপুর ও রাজশাহীর লিচু বাগানের ফুল থেকে সংগৃহীত হালকা রঙের সুগন্ধি মধু।', benefits: ['মনোরম ফুলের সুগন্ধ', 'শিশুদের প্রিয় স্বাদ', 'প্রাকৃতিক মিষ্টি'] },
    'wild-honey':      { details: 'আফ্রিকার বনাঞ্চলের বন্য মৌমাছির চাক থেকে সংগৃহীত সার্টিফায়েড অর্গানিক মধু।', benefits: ['অর্গানিক সার্টিফায়েড', 'কাঁচা ও অপরিশোধিত', 'এনজাইম সমৃদ্ধ'] },
    'sidr-honey':      { details: 'সিডর (বরই) গাছের ফুল থেকে সংগৃহীত প্রিমিয়াম মধু — বিশ্বের অন্যতম দামি ও ঔষধি মধু।', benefits: ['প্রিমিয়াম মানের মধু', 'গাঢ় ও ঘন টেক্সচার', 'শক্তি ও সুস্থতায়'] },
    'honey-nuts':      { details: 'খাঁটি মধুতে ডুবানো কাজু, কাঠবাদাম, আখরোট ও পেস্তার মিশ্রণ — সকালের নাস্তায় আদর্শ।', benefits: ['তাৎক্ষণিক শক্তি', 'প্রোটিন ও ভালো ফ্যাট', 'বাচ্চাদের প্রিয়'] },
    'ajwa-dates':      { details: 'মদিনার বিখ্যাত আজওয়া খেজুর — নরম, কালচে রং এবং অনন্য স্বাদ। তাজা ও বাছাইকৃত।', benefits: ['আয়রন ও ফাইবার সমৃদ্ধ', 'সুন্নাহ খাবার', 'তাৎক্ষণিক শক্তি'] },
    'sukkari-dates':   { details: 'সৌদি আরবের আল-কাসিম অঞ্চলের সুক্কারি মুফাত্তাল খেজুর — মুখে গলে যাওয়া নরম ও মিষ্টি।', benefits: ['প্রাকৃতিক মিষ্টি', 'হজমে সহায়ক', 'ইফতারের জন্য সেরা'] },
    'medjool-dates':   { details: 'মিশরের বড় সাইজের মেডজুল খেজুর — রসালো, ক্যারামেলের মতো স্বাদ।', benefits: ['পটাশিয়াম সমৃদ্ধ', 'বড় ও রসালো', 'উপহার দেওয়ার উপযোগী'] },
    'gawa-ghee':       { details: 'দেশি গরুর দুধের সর থেকে মাখন তুলে সনাতন পদ্ধতিতে জ্বাল দিয়ে তৈরি দানাদার গাওয়া ঘি।', benefits: ['হজমে সহায়ক', 'ভিটামিন A, D, E, K সমৃদ্ধ', 'মন মাতানো ঘ্রাণ'] },
    'mustard-oil':     { details: 'দেশি সরিষা থেকে কাঠের ঘানিতে ঠান্ডা অবস্থায় ভাঙানো খাঁটি তেল। কোনো কেমিক্যাল রিফাইনিং নেই।', benefits: ['ওমেগা-৩ সমৃদ্ধ', 'রান্নায় আসল ঝাঁঝ', 'পরিবারের জন্য সাশ্রয়ী ৫ লিটার'] },
    'coconut-oil':     { details: 'তাজা নারিকেলের শাঁস থেকে কোল্ড প্রেস পদ্ধতিতে তৈরি অর্গানিক এক্সট্রা ভার্জিন নারিকেল তেল।', benefits: ['রান্না ও বেকিংয়ে উপযোগী', 'চুল ও ত্বকের যত্ন', 'MCT সমৃদ্ধ'] },
    'chili':           { details: 'বাছাইকৃত শুকনা লাল মরিচ থেকে তৈরি, কোনো রং বা ইটের গুঁড়া মেশানো নেই।', benefits: ['কৃত্রিম রং মুক্ত', 'প্রাকৃতিক ঝাল ও ঘ্রাণ', 'ভিটামিন C সমৃদ্ধ'] },
    'turmeric':        { details: 'দেশি হলুদ রোদে শুকিয়ে নিজস্ব তত্ত্বাবধানে গুঁড়া করা। কারকিউমিনের মাত্রা বেশি।', benefits: ['প্রাকৃতিক অ্যান্টিসেপটিক', 'প্রদাহ কমায়', 'আসল রং ও স্বাদ'] },
    'coriander':       { details: 'দেশি ধনিয়া বীজ হালকা ভেজে গুঁড়া করা — রান্নায় আনে মনোরম ঘ্রাণ।', benefits: ['হজমে সহায়ক', 'তাজা ঘ্রাণ', 'ভেজালমুক্ত'] },
    'kala-bhuna':      { details: 'চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনার জন্য বিশেষ রেসিপিতে ভাজা ও গুঁড়া করা মসলার মিশ্রণ।', benefits: ['রেডি টু কুক', 'ঐতিহ্যবাহী স্বাদ', 'ভাজা মসলার ঘ্রাণ'] },
    'rice-flour':      { details: 'দেশি চাল ধুয়ে শুকিয়ে মিলে ভাঙানো মিহি চালের গুঁড়া — পিঠা, রুটি ও নাস্তার জন্য।', benefits: ['পিঠা-পুলির জন্য সেরা', 'গ্লুটেন ফ্রি', 'মিহি ও তাজা'] },
    'laal-atta':       { details: 'ভুসিসহ গম ভাঙানো লাল আটা — সাদা আটার চেয়ে বেশি ফাইবার ও পুষ্টি।', benefits: ['উচ্চ ফাইবার', 'ডায়াবেটিক ফ্রেন্ডলি', 'নরম রুটি'] },
    'mashkalai':       { details: 'দেশি মাষকলাই ডাল, পরিষ্কার ও বাছাইকৃত। কোনো রং বা পলিশ নেই।', benefits: ['উদ্ভিজ্জ প্রোটিন', 'আয়রন সমৃদ্ধ', 'দ্রুত সিদ্ধ হয়'] },
    'matcha':          { details: 'জাপানি পদ্ধতিতে ছায়ায় চাষ করা চা পাতা থেকে তৈরি অর্গানিক মাচা গ্রিন টি পাউডার।', benefits: ['অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ', 'শান্ত মনোযোগ ও শক্তি', 'লাতে ও স্মুদিতে'] },
    'spirulina':       { details: 'প্রোটিন ও মাইক্রোনিউট্রিয়েন্টে ভরপুর অর্গানিক স্পিরুলিনা পাউডার — প্রাকৃতিক সুপারফুড।', benefits: ['উচ্চ প্রোটিন', 'আয়রন ও B12', 'ডিটক্সে সহায়ক'] },
    'ashwagandha':     { details: 'USDA অর্গানিক সার্টিফায়েড অশ্বগন্ধা মূলের গুঁড়া — আয়ুর্বেদের প্রাচীন ভেষজ।', benefits: ['মানসিক চাপ কমায়', 'ঘুমের মান উন্নত করে', 'শক্তি ও স্ট্যামিনা'] },
    'coconut-vinegar': { details: 'শ্রীলঙ্কার নারিকেলের রস থেকে প্রাকৃতিক ফারমেন্টেশনে তৈরি অর্গানিক ভিনেগার।', benefits: ['প্রোবায়োটিক গুণ', 'সালাদ ও রান্নায়', 'হজমে সহায়ক'] },
    'acv':             { details: '"মাদার" সহ কাঁচা, অপরিশোধিত অর্গানিক অ্যাপল সাইডার ভিনেগার।', benefits: ['ওজন নিয়ন্ত্রণে সহায়ক', 'হজমশক্তি বাড়ায়', 'রক্তে সুগার নিয়ন্ত্রণে'] },
    'coconut-sugar':   { details: 'নারিকেল ফুলের রস জ্বাল দিয়ে তৈরি অর্গানিক চিনি — সাদা চিনির স্বাস্থ্যকর বিকল্প।', benefits: ['কম গ্লাইসেমিক ইনডেক্স', 'খনিজ সমৃদ্ধ', 'ক্যারামেলের মতো স্বাদ'] },
    'brown-sugar':     { details: 'আখের রস থেকে তৈরি কম পরিশোধিত ব্রাউন সুগার — চা, কফি ও বেকিংয়ের জন্য।', benefits: ['প্রাকৃতিক মোলাসেস', 'বেকিংয়ে উপযোগী', 'কম রিফাইন্ড'] },
    'cashew':          { details: 'মাঝারি সাইজের বাছাইকৃত কাজুবাদাম — মচমচে ও তাজা, এয়ারটাইট প্যাকে।', benefits: ['প্রোটিন ও ভালো ফ্যাট', 'হার্টের জন্য উপকারী', 'রান্না ও স্ন্যাকসে'] },
};

export const IMG: Record<string, string> = {
    sundarban: '1613548058193-1cd24c1bebcf', honeyBox: '1729698597774-5c9f7aed07d8', blackseed: '1701188543419-f2e932565056',
    lychee: '1679941279735-b3b35e8bc476', lycheeBox: '1587049352824-f7e128d4ebe5', wild: '1642067958050-bfba120a57e2',
    sidr: '1536788567643-8c2368376526', honeyNuts: '1729698598542-69472b8c10de',
    ajwa: '1776669234669-52d5c29a5b94', ajwaL: '1770617476915-7269d29d27dc',
    sukkari: '1771231591559-d19c89ad118a', sukkari3: '1775453585199-7605c46d6da1', sukkariMix: '1777891258039-54963151d2d0',
    medjool: '1629738601425-494c3d6ba3e2', medjoolJ: '1773038831316-a2f5e52a56e4', medjoolSJ: '1774857247287-d68599847107',
    ghee: '1573812461383-e5f8b759d12e', mustard: '1720468750623-39e9a09f5067', coconutOil: '1588413333412-82148535db53',
    chili: '1625921133217-8d978f7872b8', turmeric: '1615485500834-bc10199bc727', coriander: '1608797178894-bf7c596932da',
    kalaBhuna: '1603122612817-2fe0e0631a93', riceFlour: '1714842981153-ffeaf74e7a1a', atta: '1610725664285-7c57e6eeac3f',
    mashkalai: '1601723897386-e5df0c749fb7', matcha: '1565117661210-fd54898de423', spirulina: '1517336976150-79c23363af49',
    ashwagandha: '1693996046865-19217d179161', coconutVinegar: '1566557087503-b839ce6e5aa0', acv1: '1628268909461-ec1eec52a74e',
    acv2: '1534336810865-0beae4c81278', coconutSugar: '1634612831148-03a8550e1d52', brownSugar: '1722882270700-1bb76e4cd41f',
    cashew: '1726771517475-e7acdd34cd8a',
};

// [id, category, group, Bangla name, English name, size, price, image key, tag, short description]
const productRows: Row[] = [
    // Honey
    ['jv-1',  'Honey', 'sundarban-honey', 'সুন্দরবনের খাঁটি মধু', 'Sundarban Honey', '১ কেজি', 2500, 'sundarban', 'সেরা বিক্রেতা', 'সুন্দরবনের প্রাকৃতিক চাক থেকে সংগৃহীত ১০০% খাঁটি মধু।'],
    ['jv-2',  'Honey', 'sundarban-honey', 'সুন্দরবনের খাঁটি মধু', 'Sundarban Honey', '৫০০ গ্রাম', 1250, 'sundarban', 'জনপ্রিয়', 'সুন্দরবনের প্রাকৃতিক চাক থেকে সংগৃহীত ১০০% খাঁটি মধু।'],
    ['jv-3',  'Honey', 'sundarban-honey', 'সুন্দরবনের মধু (স্যাশে বক্স)', 'Sundarban Honey 15g x 24 pcs Box', '১৫ গ্রাম × ২৪ পিস', 768, 'honeyBox', 'ট্রাভেল প্যাক', 'বহনযোগ্য ১৫ গ্রামের ২৪টি প্যাক — অফিস, স্কুল ও ভ্রমণে।'],
    ['jv-4',  'Honey', 'blackseed-honey', 'কালোজিরা ফুলের মধু', 'Black Seed Honey', '১ কেজি', 1600, 'blackseed', 'ঔষধি গুণ', 'কালোজিরা ফুল থেকে সংগৃহীত গাঢ় রঙের ঔষধি মধু।'],
    ['jv-5',  'Honey', 'blackseed-honey', 'কালোজিরা ফুলের মধু', 'Black Seed Honey', '৫০০ গ্রাম', 800, 'blackseed', 'ঔষধি গুণ', 'কালোজিরা ফুল থেকে সংগৃহীত গাঢ় রঙের ঔষধি মধু।'],
    ['jv-6',  'Honey', 'lychee-honey', 'লিচু ফুলের মধু', 'Lychee Flower Honey', '১ কেজি', 1400, 'lychee', 'সুগন্ধি', 'লিচু বাগানের ফুল থেকে সংগৃহীত হালকা ও সুগন্ধি মধু।'],
    ['jv-7',  'Honey', 'lychee-honey', 'লিচু ফুলের মধু', 'Lychee Flower Honey', '৫০০ গ্রাম', 700, 'lychee', 'সুগন্ধি', 'লিচু বাগানের ফুল থেকে সংগৃহীত হালকা ও সুগন্ধি মধু।'],
    ['jv-8',  'Honey', 'lychee-honey', 'লিচু ফুলের মধু (স্যাশে বক্স)', 'Lychee Flower Honey 15g x 24 pcs Box', '১৫ গ্রাম × ২৪ পিস', 432, 'lycheeBox', 'ট্রাভেল প্যাক', 'বহনযোগ্য ১৫ গ্রামের ২৪টি লিচু মধুর প্যাক।'],
    ['jv-9',  'Honey', 'wild-honey', 'আফ্রিকান অর্গানিক ওয়াইল্ড মধু', 'African Organic Wild Honey', '৫০০ গ্রাম', 1250, 'wild', 'অর্গানিক', 'আফ্রিকার বন্য মৌচাক থেকে সংগৃহীত কাঁচা অর্গানিক মধু।'],
    ['jv-10', 'Honey', 'sidr-honey', 'কাশ্মীরি সিডর মধু', 'Kashmiri Sidr Honey', '৮০০ গ্রাম', 2000, 'sidr', 'প্রিমিয়াম', 'কাশ্মীরের সিডর (বরই) ফুল থেকে সংগৃহীত প্রিমিয়াম মধু।'],
    ['jv-11', 'Honey', 'honey-nuts', 'হানি নাটস', 'Honey Nuts', '৮০০ গ্রাম', 1700, 'honeyNuts', 'শক্তিদায়ক', 'খাঁটি মধুতে ডুবানো প্রিমিয়াম বাদামের মিশ্রণ।'],
    // Dates
    ['jv-12', 'Dates', 'ajwa-dates', 'আজওয়া প্রিমিয়াম খেজুর', 'Ajwa Premium Fresh Dates', '১ কেজি', 2200, 'ajwa', 'মদিনার', 'মদিনার বিখ্যাত নরম ও তাজা আজওয়া খেজুর।'],
    ['jv-13', 'Dates', 'ajwa-dates', 'আজওয়া প্রিমিয়াম খেজুর (লার্জ)', 'Ajwa Premium Fresh Dates (Large)', '১ কেজি', 2500, 'ajwaL', 'লার্জ সাইজ', 'বড় সাইজের বাছাইকৃত আজওয়া খেজুর।'],
    ['jv-14', 'Dates', 'ajwa-dates', 'আজওয়া প্রিমিয়াম খেজুর', 'Ajwa Premium Fresh Dates', '৫০০ গ্রাম', 1100, 'ajwa', 'মদিনার', 'মদিনার বিখ্যাত নরম ও তাজা আজওয়া খেজুর।'],
    ['jv-15', 'Dates', 'ajwa-dates', 'আজওয়া প্রিমিয়াম খেজুর (লার্জ)', 'Ajwa Premium Fresh Dates (Large)', '৫০০ গ্রাম', 1250, 'ajwaL', 'লার্জ সাইজ', 'বড় সাইজের বাছাইকৃত আজওয়া খেজুর।'],
    ['jv-16', 'Dates', 'sukkari-dates', 'সুক্কারি মুফাত্তাল মালাকি খেজুর', 'Sukkari Mufattal Malaki Dates', '১ কেজি', 1500, 'sukkari', 'নরম ও মিষ্টি', 'মুখে গলে যাওয়া নরম ও মিষ্টি সুক্কারি খেজুর।'],
    ['jv-17', 'Dates', 'sukkari-dates', 'সুক্কারি মুফাত্তাল মালাকি খেজুর', 'Sukkari Mufattal Malaki Dates', '৩ কেজি', 4500, 'sukkari3', 'ফ্যামিলি প্যাক', 'পরিবারের জন্য ৩ কেজির সাশ্রয়ী প্যাক।'],
    ['jv-18', 'Dates', 'sukkari-dates', 'সুক্কারি মুফাত্তাল খেজুর (মিক্সড সাইজ)', 'Sukkari Mufattal Dates (Mixed Size)', '৫০০ গ্রাম', 750, 'sukkariMix', 'সাশ্রয়ী', 'মিক্সড সাইজের নরম সুক্কারি খেজুর।'],
    ['jv-19', 'Dates', 'medjool-dates', 'ইজিপশিয়ান মেডজুল খেজুর (লার্জ)', 'Egyptian Medjool Large', '১ কেজি', 2200, 'medjool', 'রসালো', 'মিশরের বড় ও রসালো মেডজুল খেজুর।'],
    ['jv-20', 'Dates', 'medjool-dates', 'ইজিপশিয়ান মেডজুল খেজুর (জাম্বো)', 'Egyptian Medjool Dates (Jumbo)', '১ কেজি', 2500, 'medjoolJ', 'জাম্বো', 'জাম্বো সাইজের মেডজুল খেজুর।'],
    ['jv-21', 'Dates', 'medjool-dates', 'ইজিপশিয়ান মেডজুল খেজুর (সুপার জাম্বো)', 'Egyptian Medjool Dates (Super Jumbo)', '১ কেজি', 2700, 'medjoolSJ', 'সুপার জাম্বো', 'সবচেয়ে বড় সাইজের সুপার জাম্বো মেডজুল।'],
    // Oil & Ghee
    ['jv-22', 'OilGhee', 'gawa-ghee', 'খাঁটি গাওয়া ঘি', 'Gawa Ghee', '১ কেজি', 1990, 'ghee', 'সেরা বিক্রেতা', 'দেশি গরুর দুধের সর থেকে তৈরি দানাদার গাওয়া ঘি।'],
    ['jv-23', 'OilGhee', 'gawa-ghee', 'খাঁটি গাওয়া ঘি', 'Gawa Ghee', '৫০০ গ্রাম', 1000, 'ghee', 'গাওয়া ঘি', 'দেশি গরুর দুধের সর থেকে তৈরি দানাদার গাওয়া ঘি।'],
    ['jv-24', 'OilGhee', 'mustard-oil', 'দেশি সরিষার তেল', 'Deshi Mustard Oil', '৫ লিটার', 1700, 'mustard', 'ঘানি ভাঙা', 'দেশি সরিষা থেকে ঘানিতে ভাঙানো ঝাঁঝালো খাঁটি তেল।'],
    ['jv-25', 'OilGhee', 'coconut-oil', 'অর্গানিক এক্সট্রা ভার্জিন নারিকেল তেল', 'Organic Extra Virgin Coconut Oil', '১ লিটার', 2080, 'coconutOil', 'কোল্ড প্রেসড', 'কোল্ড প্রেসড অর্গানিক এক্সট্রা ভার্জিন নারিকেল তেল।'],
    ['jv-26', 'OilGhee', 'coconut-oil', 'অর্গানিক এক্সট্রা ভার্জিন নারিকেল তেল', 'Organic Extra Virgin Coconut Oil', '৫০০ মিলি', 1260, 'coconutOil', 'কোল্ড প্রেসড', 'কোল্ড প্রেসড অর্গানিক এক্সট্রা ভার্জিন নারিকেল তেল।'],
    // Spices, Flour & Dal
    ['jv-27', 'Spice', 'chili', 'মরিচ গুঁড়া', 'Chili (Morich) Powder', '৫০০ গ্রাম', 400, 'chili', 'ভেজালমুক্ত', 'রং ছাড়া খাঁটি লাল মরিচের গুঁড়া।'],
    ['jv-28', 'Spice', 'turmeric', 'হলুদ গুঁড়া', 'Turmeric (Holud) Powder', '৫০০ গ্রাম', 295, 'turmeric', 'রং ছাড়া', 'দেশি হলুদ থেকে তৈরি খাঁটি হলুদ গুঁড়া।'],
    ['jv-29', 'Spice', 'coriander', 'ধনিয়া গুঁড়া', 'Coriander Powder', '৫০০ গ্রাম', 240, 'coriander', 'তাজা ঘ্রাণ', 'হালকা ভাজা দেশি ধনিয়ার সুগন্ধি গুঁড়া।'],
    ['jv-30', 'Spice', 'kala-bhuna', 'কালা ভুনা মসলা', 'Kala Bhuna Masala', '৫০০ গ্রাম', 1500, 'kalaBhuna', 'স্পেশাল রেসিপি', 'চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনার বিশেষ মসলা।'],
    ['jv-31', 'Spice', 'rice-flour', 'চালের গুঁড়া', 'Rice Flour (Chaler Gura)', '২ কেজি', 200, 'riceFlour', 'পিঠার জন্য', 'পিঠা-পুলি ও রুটির জন্য মিহি চালের গুঁড়া।'],
    ['jv-32', 'Spice', 'laal-atta', 'লাল আটা', 'Laal Atta', '২ কেজি', 200, 'atta', 'উচ্চ ফাইবার', 'ভুসিসহ গম ভাঙানো পুষ্টিকর লাল আটা।'],
    ['jv-33', 'Spice', 'mashkalai', 'মাষকলাই ডাল', 'Mashkalai Dal', '১ কেজি', 300, 'mashkalai', 'দেশি', 'পরিষ্কার ও বাছাইকৃত দেশি মাষকলাই ডাল।'],
    // Organic / Health
    ['jv-34', 'Health', 'matcha', 'অর্গানিক মাচা গ্রিন টি', 'Glarvest Organic Matcha Green Tea', '১০০ গ্রাম', 1500, 'matcha', 'অর্গানিক', 'অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ অর্গানিক মাচা গ্রিন টি পাউডার।'],
    ['jv-35', 'Health', 'spirulina', 'অর্গানিক স্পিরুলিনা পাউডার', 'Organic Spirulina Powder', '২৫০ গ্রাম', 1200, 'spirulina', 'সুপারফুড', 'প্রোটিন ও মিনারেলে ভরপুর স্পিরুলিনা পাউডার।'],
    ['jv-36', 'Health', 'ashwagandha', 'অশ্বগন্ধা পাউডার (USDA অর্গানিক)', 'Ashwagandha Powder (USDA Organic)', '১০০ গ্রাম', 600, 'ashwagandha', 'USDA অর্গানিক', 'USDA অর্গানিক সার্টিফায়েড অশ্বগন্ধা মূলের গুঁড়া।'],
    ['jv-37', 'Health', 'coconut-vinegar', 'সিলন অর্গানিক কোকোনাট ভিনেগার', 'Ceylon Organic Coconut Vinegar', '৫০০ মিলি', 1065, 'coconutVinegar', 'প্রোবায়োটিক', 'নারিকেলের রস থেকে তৈরি অর্গানিক ভিনেগার।'],
    ['jv-38', 'Health', 'acv', 'অর্গানিক অ্যাপল সাইডার ভিনেগার (Discovery)', 'Discovery Organic Apple Cider Vinegar', '২৫০ মিলি', 520, 'acv1', 'মাদার সহ', 'কাঁচা ও অপরিশোধিত অর্গানিক অ্যাপল সাইডার ভিনেগার।'],
    ['jv-39', 'Health', 'acv', 'অর্গানিক অ্যাপল সাইডার ভিনেগার (Karkuma)', 'Karkuma Organic Apple Cider Vinegar', '৪৮০ মিলি', 900, 'acv2', 'মাদার সহ', 'কাঁচা ও অপরিশোধিত অর্গানিক অ্যাপল সাইডার ভিনেগার।'],
    ['jv-40', 'Health', 'coconut-sugar', 'সিলন অর্গানিক কোকোনাট সুগার', 'Ceylon Organic Coconut Sugar', '২০০ গ্রাম', 650, 'coconutSugar', 'লো জিআই', 'সাদা চিনির স্বাস্থ্যকর বিকল্প অর্গানিক নারিকেল চিনি।'],
    ['jv-41', 'Health', 'brown-sugar', 'ব্রাউন সুগার (SIS)', 'SIS Brown Sugar', '৮০০ গ্রাম', 650, 'brownSugar', 'কম রিফাইন্ড', 'চা, কফি ও বেকিংয়ের জন্য ব্রাউন সুগার।'],
    // Nuts
    ['jv-42', 'Nuts', 'cashew', 'কাজুবাদাম (মিডিয়াম সাইজ)', 'Cashew Nuts Medium Size', '১ কেজি', 2000, 'cashew', 'প্রিমিয়াম', 'বাছাইকৃত মচমচে মাঝারি সাইজের কাজুবাদাম।'],
];

export const productsData: Product[] = productRows.map(([id, category, group, name, en, weight, price, imgKey, tag, description]) => ({
    id, category, group, name, en, weight, price, tag, description,
    image: img(IMG[imgKey]),
    ...groupInfo[group],
}));

export const reviewsData: Review[] = [
    { text: 'সুন্দরবনের মধুটার ঘ্রাণ আর স্বাদ একদম আসল। ল্যাব রিপোর্ট দেখে নিশ্চিন্ত হয়ে অর্ডার করেছিলাম, হতাশ হইনি।', name: 'নাসরিন আক্তার', loc: 'উত্তরা, ঢাকা', rating: 5, product: 'jv-2' },
    { text: 'আজওয়া খেজুরগুলো একদম তাজা আর নরম। রমজানে পুরো পরিবারের জন্য নিয়েছিলাম।', name: 'রফিকুল ইসলাম', loc: 'জিইসি, চট্টগ্রাম', rating: 5, product: 'jv-12' },
    { text: 'পারিবারিক প্যাকেজটা খুব সুবিধাজনক। প্রতি মাসে সুন্দর প্যাক করে ক্যাশ অন ডেলিভারিতে পাঠিয়ে দেয়।', name: 'তানজিনা করিম', loc: 'জিন্দাবাজার, সিলেট', rating: 5, product: 'jv-24' },
    { text: 'গাওয়া ঘি এর দানা আর ঘ্রাণ ছোটবেলায় নানুবাড়িতে খাওয়া ঘি এর কথা মনে করিয়ে দিল।', name: 'মাহমুদুল হাসান', loc: 'রাজশাহী', rating: 5, product: 'jv-22' },
    { text: 'লাল আটার রুটি নরম হয় আর খেতেও ভালো। বাবার ডায়াবেটিসের জন্য নিয়মিত নিচ্ছি।', name: 'সুমাইয়া রহমান', loc: 'খুলনা', rating: 4, product: 'jv-32' },
    { text: 'হলুদ আর মরিচ গুঁড়ার রং দেখেই বোঝা যায় কোনো ভেজাল নেই। রান্নার স্বাদ বেড়ে গেছে।', name: 'আরিফ চৌধুরী', loc: 'মিরপুর, ঢাকা', rating: 5, product: 'jv-28' },
];

// Monthly family package: product id -> quantity
export const bundlePlans: Record<number, Record<string, number>> = {
    2: { 'jv-2': 1, 'jv-24': 1, 'jv-23': 1, 'jv-33': 1, 'jv-28': 1, 'jv-27': 1 },
    4: { 'jv-1': 1, 'jv-24': 1, 'jv-22': 1, 'jv-33': 2, 'jv-28': 1, 'jv-27': 1, 'jv-32': 1 },
    6: { 'jv-1': 1, 'jv-24': 2, 'jv-22': 1, 'jv-33': 3, 'jv-28': 1, 'jv-27': 1, 'jv-32': 2, 'jv-31': 1 },
};

// results: [test, measured value, allowed limit, % of the limit used]
export const certsData: Cert[] = [
    { key: 'honey', icon: 'fa-flask-vial', tone: 'leaf', lab: 'BCSIR ল্যাব রিপোর্ট', title: 'মধুর বিশুদ্ধতা পরীক্ষা',
      summary: 'সুক্রোজ ও সি-৪ সুগার মুক্ত (১০০% ভেজালহীন প্রমাণিত)।', reg: 'JVX-HNY-2026-10421', date: 'আগস্ট ২০২৬',
      results: [['আর্দ্রতা', '১৮.২%', '≤ ২০%', 91], ['সুক্রোজ', '১.১%', '≤ ৫%', 22], ['HMF', '১২ mg/kg', '≤ ৪০ mg/kg', 30], ['C-4 সুগার', 'শনাক্ত হয়নি', '০%', 0]] },
    { key: 'oil', icon: 'fa-droplet', tone: 'gold', lab: 'BSTI স্ট্যান্ডার্ড', title: 'গাওয়া ঘি ও সরিষার তেল',
      summary: 'এসিড ভ্যালু ও আর্দ্রতার মাত্রা আন্তর্জাতিক মানসম্পন্ন।', reg: 'JVX-OIL-2026-20877', date: 'জুলাই ২০২৬',
      results: [['এসিড ভ্যালু', '১.৮', '≤ ৬.০', 30], ['আর্দ্রতা', '০.১২%', '≤ ০.২৫%', 48], ['আর্জিমোন তেল', 'শনাক্ত হয়নি', '০%', 0], ['পারঅক্সাইড ভ্যালু', '৪.২', '≤ ১০', 42]] },
    { key: 'spice', icon: 'fa-pepper-hot', tone: 'leaf', lab: 'হেভি মেটাল টেস্ট', title: 'মসলা, আটা ও ডাল',
      summary: 'সিসা, আর্সেনিক, কৃত্রিম রং ও কীটনাশকের উপস্থিতি শূন্য প্রমাণিত।', reg: 'JVX-SPC-2026-31590', date: 'সেপ্টেম্বর ২০২৬',
      results: [['সিসা (Pb)', 'শনাক্ত হয়নি', '≤ ০.২ ppm', 0], ['আর্সেনিক (As)', 'শনাক্ত হয়নি', '≤ ০.১ ppm', 0], ['কীটনাশক অবশিষ্ট', 'শনাক্ত হয়নি', '০', 0], ['কৃত্রিম রং', 'শনাক্ত হয়নি', '০', 0]] },
];

export const BUNDLE_DISCOUNT = 0.05;
export const PROMO_CODE = 'JAVRVX10';
export const PROMO_RATE = 0.10;
export const DELIVERY_OPTIONS = [
    { value: 60,  label: 'ঢাকার ভিতরে (৳৬০)' },
    { value: 120, label: 'ঢাকার বাইরে (৳১২০)' },
];
