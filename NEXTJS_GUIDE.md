# Next.js To'liq Qo'llanmasi: Basicdan Advancedgacha 🚀

Ushbu qo'llanma Next.js frameworkini o'rganish, unda mukammal va yuqori samarali web-ilovalarni yaratish uchun mo'ljallangan. Qo'llanma eng sodda tushunchalardan tortib, eng ilg'or (advanced) arxitekturaviy yondashuvlargacha qamrab oladi.

---

## Mundarija
1. [Kirish: Next.js nima?](#1-kirish-nextjs-nima)
2. [Loyiha Tuzilishi va Fayllar Ierarxiyasi](#2-loyiha-tuzilishi-va-fayllar-ierarxiyasi)
3. [Routing (Yo'naltirish) Tizimi](#3-routing-yonaltirish-tizimi)
4. [Rendering Strategiyalari (SSR, SSG, ISR, CSR)](#4-rendering-strategiyalari-ssr-ssg-isr-csr)
5. [Server va Client Componentlar](#5-server-va-client-componentlar)
6. [Data Fetching (Ma'lumotlarni Yuklash)](#6-data-fetching-malumotlarni-yuklash)
7. [Server Actions (Server Amallari)](#7-server-actions-server-amallari)
8. [Route Handlers (API Routes)](#8-route-handlers-api-routes)
9. [Middleware (Oraliq Dastur)](#9-middleware-oraliq-dastur)
10. [Optimallashtirish (Optimization & SEO)](#10-optimallashtirish-optimization--seo)
11. [Advanced Routing (Parallel va Intercepting Routes)](#11-advanced-routing-parallel-va-intercepting-routes)
12. [Deployment (Loyihani Serverga Joylash)](#12-deployment-loyihani-serverga-joylash)

---

## 1. Kirish: Next.js nima?

**Next.js** — bu React kutubxonasi ustiga qurilgan, Full-Stack web-ilovalar yaratish uchun mo'ljallangan framework. React faqat foydalanuvchi interfeysini (UI) yaratish bilan cheklansa, Next.js routing, server-side rendering, API yaratish va optimallashtirish kabi barcha kerakli vositalarni tayyor holda taqdim etadi.

### Nima uchun Next.js?
* **SEO-friendly (Qidiruv tizimlariga mos):** Server-side rendering (SSR) tufayli qidiruv tizimlari (Google, Yandex) sayt sahifalarini oson indekslaydi.
* **Tezlik va Hosildorlik:** Tasvirlar, shriftlar va kodlarni avtomatik optimallashtiradi.
* **Full-stack imkoniyat:** Alohida backend server ochmasdan, Next.js ichida API yozish va ma'lumotlar bazasi bilan to'g'ridan-to'g'ri ishlash mumkin.
* **Zero Configuration:** Transpilyatsiya (Babel/SWC), bundling (Webpack/Turbopack) avtomatik sozlangan.

---

## 2. Loyiha Tuzilishi va Fayllar Ierarxiyasi

Hozirgi kunda Next.js **App Router** (tavsiya etilgan) va **Pages Router** tizimlariga ega. Biz asosan **App Router** (yangi Next.js versiyalari standarti) asosida gaplashamiz.

Klassik Next.js (App Router) loyihasi tuzilishi:

```
my-next-app/
├── src/
│   ├── app/
│   │   ├── layout.js       # Asosiy shablon (HTML, Body, shriftlar)
│   │   ├── page.js         # Bosh sahifa (domain.com/)
│   │   ├── globals.css     # Global CSS stillari
│   │   ├── about/
│   │   │   └── page.js     # "/about" sahifasi
│   │   └── api/
│   │       └── route.js    # API yo'li (Endpoint)
│   └── components/         # Qayta ishlatiladigan UI komponentlar
├── public/                 # Statik fayllar (rasmlar, ikonlar)
├── package.json            # Bog'liqliklar va buyruqlar
└── next.config.mjs         # Next.js sozlamalari
```

---

## 3. Routing (Yo'naltirish) Tizimi

Next.js-da routing fayllar tizimiga asoslangan. Har bir papka URL manziliga mos keladi. Sahifa bo'lishi uchun papka ichida albatta `page.js` (yoki `page.tsx`) fayli bo'lishi kerak.

### Maxsus Fayllar:
* `page.js`: Sahifaning asosiy UI qismi.
* `layout.js`: Sahifalar uchun umumiy shablon (masalan, Header va Footer). Holatni (state) saqlab qoladi va qayta render bo'lmaydi.
* `template.js`: Layout kabi ishlaydi, lekin har safar yo'nalish o'zgarganda yangidan render bo'ladi (state saqlanmaydi).
* `loading.js`: Sahifa yuklanayotgan vaqtda ko'rsatiladigan yuklanish ekrani (Suspense asosida).
* `error.js`: Sahifada xatolik yuz berganda ko'rsatiladigan UI.
* `not-found.js`: Sahifa topilmaganda ko'rsatiladigan 404 sahifasi.

### Dinamik Yo'nalishlar (Dynamic Routes)
Agar sizga dinamik ID (masalan, blog posti yoki mahsulot sahifasi) kerak bo'lsa, papka nomini kvadrat qavs ichiga yozasiz:
`app/blog/[id]/page.js` -> URL: `/blog/123` yoki `/blog/react-guide`

Ushbu ID sahifada `params` prop orqali olinadi:
```javascript
export default async function BlogPost({ params }) {
  const { id } = await params; // Next.js 15-dan boshlab params - Promise hisoblanadi
  return <h1>Blog Post ID: {id}</h1>;
}
```

* **Catch-all Routes `[...folder]`**: Istalgancha chuqurlikdagi yo'llarni ushlaydi.
  `app/shop/[...slug]/page.js` -> `/shop/clothes/shirts/red` (params.slug = `['clothes', 'shirts', 'red']`)
* **Optional Catch-all `[[...slug]]`**: Yuqoridagi kabi, lekin `/shop` o'zini ham ushlaydi (slug undefined bo'ladi).

---

## 4. Rendering Strategiyalari (SSR, SSG, ISR, CSR)

Next.js loyihangizning talabidan kelib chiqib, har bir sahifani turlicha render qilish imkonini beradi:

| Strategiya | Kengaytmasi | Tushunchasi | Qachon ishlatiladi? |
| :--- | :--- | :--- | :--- |
| **CSR** | Client-Side Rendering | Klassik React kabi. Sayt brauzerda yuklanadi. | Shaxsiy kabinetlar, boshqaruv panellari (dashboard). |
| **SSR** | Server-Side Rendering | Har bir so'rov kelganda, server sahifani yangidan yig'ib foydalanuvchiga yuboradi. | Tez-tez o'zgarib turadigan ma'lumotli sahifalar (masalan, ob-havo, valyuta kursi). |
| **SSG** | Static Site Generation | Sahifa loyihani build (yig'ish) vaqtida bir marta yaratiladi va serverda saqlanadi. Eng tez usul. | Blog postlari, ko'p o'zgarmaydigan dokumentatsiyalar yoki landing page. |
| **ISR** | Incremental Static Regeneration | Sahifa statik bo'ladi, lekin ma'lum vaqt oralig'ida fon rejimida serverda qayta yangilanadi. | Yangiliklar sayti, mahsulotlar ro'yxati (ma'lumotlar tez-tez o'zgaradi, lekin tez yuklanishi shart). |

Next.js-da rendering strategiyasini sozlash:
```javascript
// SSR qilish uchun (dynamic rendering)
export const dynamic = 'force-dynamic';

// ISR qilish uchun (har 60 soniyada yangilash)
export const revalidate = 60; 
```

---

## 5. Server va Client Componentlar

Next.js-ning asosi bu **React Server Components (RSC)**. Standart bo'yicha barcha komponentlar Server komponent hisoblanadi.

### Farqlari:

| Xususiyati | Server Component | Client Component |
| :--- | :--- | :--- |
| **Washing/Render joyi** | Faqat Serverda | Serverda (dastlabki render) va Brauzerda |
| **Brauzer API (window, document)** | Ishlatib bo'lmaydi | Ishlatsa bo'ladi |
| **React Hooks (useState, useEffect)** | Ishlatib bo'lmaydi | Ishlatsa bo'ladi |
| **Xavfsizlik** | Maxfiy kalitlarni to'g'ridan-to'g'ri ishlatsa bo'ladi | Faqat ommaviy ma'lumotlar uchun |
| **JS yuklama (Bundle size)** | 0 KB brauzerga yuboriladi | Brauzer yuklab olishi kerak |

### Client Component yaratish:
Komponent faylining eng tepasiga `"use client"` satrini yozish kerak.

```javascript
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Soni: {count}
    </button>
  );
}
```

> **Oltin Qoida:** Komponentlarni iloji boricha Server komponent qilib yarating. Faqat interaktivlik (kliklar, formalar, hooklar) yoki brauzer API kerak bo'lgandagina uni Client komponentga aylantiring.

---

## 6. Data Fetching (Ma'lumotlarni Yuklash)

Next.js-da server komponentlar ichida ma'lumotlarni to'g'ridan-to'g'ri `async/await` yordamida yuklash mumkin:

```javascript
// app/users/page.js (Server Component)
export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Keshni boshqarish (Caching & Revalidation)
Next.js standart `fetch` API-ni keshni boshqarish uchun kengaytirgan:

```javascript
// 1. Doimiy kesh (SSG) - standart holat
fetch('https://api.example.com/data', { cache: 'force-cache' });

// 2. Keshni o'chirish (SSR) - har so'rovda yangi ma'lumot
fetch('https://api.example.com/data', { cache: 'no-store' });

// 3. Vaqtga asoslangan yangilash (ISR) - har 3600 soniyada yangilash
fetch('https://api.example.com/data', { next: { revalidate: 3600 } });
```

### On-demand Revalidation (Talab bo'yicha keshni tozalash)
Agar siz bazadagi ma'lumot o'zgarganda keshni darhol yangilamoqchi bo'lsangiz, `revalidatePath` yoki `revalidateTag` ishlatasiz:

```javascript
import { revalidatePath, revalidateTag } from 'next/cache';

// Ma'lum bir sahifa keshini tozalash
revalidatePath('/products');

// Tag bo'yicha keshni o'chirish (fetch so'rovida next: { tags: ['posts'] } berilgan bo'lsa)
revalidateTag('posts');
```

---

## 7. Server Actions (Server Amallari)

**Server Actions** — bu Next.js-da API yozmasdan, to'g'ridan-to'g'ri frontenddan turib server kodini (masalan, ma'lumotlar bazasiga yozish) chaqirish imkonini beruvchi kuchli vosita.

```javascript
// app/actions.js
"use server";

import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // Bu erda Ma'lumotlar bazasiga (DB) yozish kodi bo'ladi
  // await db.insert({ title, content });

  revalidatePath('/blog'); // Blog sahifasi keshini yangilaymiz
}
```

Endi bu action-ni formaga ulaymiz:
```javascript
// app/blog/new/page.js
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <form action={createPost} className="p-4 flex flex-col gap-2">
      <input type="text" name="title" placeholder="Sarlavha" required className="border p-2"/>
      <textarea name="content" placeholder="Matn" required className="border p-2"/>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Yaratish
      </button>
    </form>
  );
}
```

---

## 8. Route Handlers (API Routes)

Agar sizga tashqi ilovalar yoki mobil dasturlar uchun API kerak bo'lsa, `route.js` (yoki `route.ts`) fayllaridan foydalanib RESTful API-lar yaratishingiz mumkin:

`app/api/users/route.js`:
```javascript
import { NextResponse } from 'next/server';

// GET so'rovi uchun
export async function GET(request) {
  const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Vali' }
  ];
  return NextResponse.json(users);
}

// POST so'rovi uchun
export async function POST(request) {
  const body = await request.json();
  // Yangi foydalanuvchini bazaga qo'shish...
  return NextResponse.json({ message: "Muvaffaqiyatli yaratildi", data: body }, { status: 201 });
}
```

---

## 9. Middleware (Oraliq Dastur)

**Middleware** so'rov yakunlanishidan oldin kodni ishga tushirish imkonini beradi. U orqali foydalanuvchini autentifikatsiyadan o'tkazish, geo-lokatsiyasini aniqlash yoki sahifalarni yo'naltirish (redirect) mumkin.

Loyiha ildiz papkasida (odatda `src/` ichida) `middleware.js` faylini yarating:

```javascript
// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session-token');

  // Agar foydalanuvchi tizimga kirmagan bo'lsa va profil sahifasiga kirmoqchi bo'lsa
  if (!token && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Middleware qaysi yo'nalishlarda ishlashini belgilash
export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*'],
};
```

---

## 10. Optimallashtirish (Optimization & SEO)

Next.js avtomatik tarzda web-saytingizni maksimal darajada optimallashtiradi. Buning uchun maxsus komponentlar taqdim etiladi.

### Rasm Optimizatsiyasi (`next/image`)
Klassik `<img>` tegi o'rniga ishlatiladi. Rasmni avtomatik ravishda zamonaviy formatlarga (WebP, AVIF) o'tkazadi, o'lchamini moslashtiradi va lazy loading (kechiktirib yuklash) qiladi.

```javascript
import Image from 'next/image';
import myBanner from '@/public/banner.jpg';

export default function Home() {
  return (
    <div>
      {/* Mahalliy rasm */}
      <Image src={myBanner} alt="Banner rasmi" placeholder="blur" />

      {/* Tashqi havola (next.config.mjs ichida ruxsat berilishi shart) */}
      <Image 
        src="https://images.example.com/photo.png" 
        alt="Tashqi rasm" 
        width={500} 
        height={300} 
        priority // Next.js 15+ yoki LCP uchun
      />
    </div>
  );
}
```

### Shriftlar Optimizatsiyasi (`next/font`)
Google shriftlarini build vaqtida yuklab olib, loyiha ichiga joylashtiradi (self-hosting). Brauzerda tashqi shriftdan so'rov ketmaydi va CLS (Cumulative Layout Shift) xatolari kamayadi.

```javascript
// app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Metadata va SEO (Qidiruv Optimizatsiyasi)
Metadata API sahifalaringiz sarlavhasi (title), tavsifi (description) va ijtimoiy tarmoqlar uchun sozlamalarini (Open Graph) belgilashga yordam beradi.

```javascript
// Statik metadata
export const metadata = {
  title: 'Mening Next.js loyiham',
  description: 'Dasturlash bo\'yicha to\'liq darsliklar va ma\'lumotlar',
};

// Dinamik metadata (Masalan, blog postlari uchun)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await fetch(`https://api.example.com/posts/${id}`).then(res => res.json());

  return {
    title: `${post.title} | Mening Saytim`,
    description: post.summary,
    openGraph: {
      images: [post.coverImage],
    },
  };
}
```

---

## 11. Advanced Routing (Parallel va Intercepting Routes)

Bu Next.js-ning eng murakkab yo'naltirish (routing) xususiyatlaridan biri bo'lib, murakkab UI-lar yaratishda yordam beradi.

### Parallel Routes (Parallel yo'nalishlar)
Bitta sahifa ichida bir vaqtning o'zida ikkita har xil yo'nalishni render qilish imkonini beradi. Ular `@` belgisi bilan boshlanadigan papkalar yordamida yaratiladi.

Masalan: `app/dashboard/layout.js` ichida `@analytics` va `@team` slotlarini ishlatish mumkin.

```
app/dashboard/
├── @analytics/
│   └── page.js
├── @team/
│   └── page.js
├── layout.js
└── page.js
```

`dashboard/layout.js` faylida:
```javascript
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div className="flex flex-col">
      <div>{children}</div>
      <div className="flex gap-4">
        <div className="w-1/2">{analytics}</div>
        <div className="w-1/2">{team}</div>
      </div>
    </div>
  );
}
```

### Intercepting Routes (Yo'nalishlarni to'sish)
Bu xususiyat foydalanuvchi joriy sahifada turganda boshqa yo'nalishni yuklash imkonini beradi. Masalan, mahsulotlar ro'yxatida biror mahsulotni bosganda uni Modal oyna (pop-up) sifatida ochish, lekin sahifani to'liq yangilasa (refresh) alohida sahifa bo'lib ochilishi.

* `(.)folder` -> bitta darajadagi yo'lni to'sadi.
* `(..)(.)folder` -> ikki daraja yuqorini to'sadi.
* `(...)folder` -> `app/` ildiz darajasini to'sadi.

---

## 12. Deployment (Loyihani Serverga Joylash)

Next.js loyihalarini joylashtirish juda oson.

### 1. Vercel (Eng oson va tavsiya etilgan)
Next.js yaratuvchilari (Vercel) tomonidan taqdim etilgan platforma.
1. GitHub-ga loyihangizni yuklang.
2. Vercel.com-da hisob ochib, loyihangizni GitHub-dan import qiling.
3. Vercel avtomatik ravishda loyihani build qiladi va har bir `git push` qilganingizda vaqtida yangilab boradi.

### 2. O'zingizning Node.js Serveringizda (VPS / Dedicated)
Agar siz loyihani o'zingizning VPS serveringizda (masalan Ubuntu) ishga tushirmoqchi bo'lsangiz:

1. Serverga loyiha kodini yuklang va kutubxonalarni o'rnating:
   ```bash
   npm install
   ```
2. Loyihani ishlab chiqarish (production) uchun tayyorlang:
   ```bash
   npm run build
   ```
3. Loyihani fonda ishga tushirish uchun PM2 utilitasidan foydalaning:
   ```bash
   pm2 start npm --name "nextjs-app" -- start -- -p 3000
   ```
4. Serverga Nginx o'rnatib, Reverse Proxy orqali 3000-portni foydalanuvchilarga taqdim eting.

---

## Xulosa

Next.js hozirgi kunda zamonaviy React ekotizimidagi eng yetakchi frameworkdir. U orqali siz ham tezkor, han SEO uchun mos bo'lgan mukammal veb ilovalar yarata olasiz. Ushbu qo'llanmada keltirilgan qoidalar loyihangizni to'g'ri va samarali boshlashga yordam beradi.

Omad yor bo'lsin! 💻✨
