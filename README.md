# 🛒 E-Commerce Sales Analytics Dashboard

> **🚀 LIVE DEMO:** [https://e-commerce-sales-analytics-flax.vercel.app](https://e-commerce-sales-analytics-flax.vercel.app)

A full-stack analytics platform that transforms raw e-commerce transaction data into actionable business insights. Built with **Next.js 15 (App Router)**, **React 19**, **Recharts**, **Prisma ORM**, and **SQLite/PostgreSQL**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📊 Live Dashboard Preview

The deployed dashboard delivers **real-time KPIs** across 2,000 transactions spanning 22 countries (2023–2025):

| Metric | Value | YoY Change |
|--------|-------|------------|
| 💰 Total Revenue | **$540.9K** | +6.4% vs 2024 |
| 📈 Net Profit | **$84.2K** | +5.5% vs 2024 |
| 📦 Total Orders | **2,000** | +0.5% vs 2024 |
| 💵 Avg Order Value | **$270** | +6.0% vs 2024 |
| 🎯 Profit Margin | **15.56%** | — |
| 👥 Unique Customers | **636** | 3.1 orders/customer |

👉 **Try the live demo:** [e-commerce-sales-analytics-flax.vercel.app](https://e-commerce-sales-analytics-flax.vercel.app)

---

## ✨ Features

### Analytics Capabilities
- **KPI Cards** — Total Revenue, Net Profit, Total Orders, Avg Order Value, Profit Margin, Unique Customers, Avg Discount, Total Shipping
- **📊 Overview Tab** — Executive summary, monthly sales & profit trend chart, key insights
- **💰 Sales Tab** — Monthly trends, day-of-week heatmap, quarterly heatmap, year-over-year comparison
- **🌍 Geographic Tab** — Regional revenue distribution, country-level breakdowns across 22 countries
- **🛍️ Products Tab** — Top-N products by revenue, category mix (Electronics, Clothing, Home & Kitchen, Books)
- **👥 Customers Tab** — Customer segmentation (Consumer, Corporate, Home Office), segment × category stacking
- **⚙️ Operations Tab** — Discount scatter analysis, payment method mix, shipping cost analysis, correlation heatmap, recent orders table

### Engineering Highlights
- ⚡ **In-memory 60-second cache** on `/api/analytics` for high-throughput aggregations
- 🧱 **Prisma ORM** with composite indexes on `orderDate`, `region`, `productCategory`, `customerSegment`, `country`
- 🔄 **Singleton Prisma client** to prevent connection pool exhaustion during dev hot-reloads
- 🎯 **Server-side pagination + filtering** on `/api/orders` (limit ≤ 100, offset pagination)
- 🧭 **Hash-based tab routing** with smooth scroll restoration
- 📱 Fully responsive layout (mobile / tablet / desktop up to 1600px)
- 🔄 **GitHub Actions CI** — auto-runs lint + build on every push/PR

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js / React 19)              │
│  Dashboard Page → Header & Tabs → KPI Cards → Charts → Table  │
└──────────────────────────┬───────────────────────────────────┘
                           │ fetch()
┌──────────────────────────▼───────────────────────────────────┐
│              Backend (Next.js App Router API Routes)         │
│  /api/analytics  (60s cached aggregations)                  │
│  /api/orders     (GET/POST with pagination & filters)        │
│  /api/orders/[id](GET/PATCH/DELETE single order)             │
│  Analytics Engine (analytics.ts)                            │
└──────────────────────────┬───────────────────────────────────┘
                           │ Prisma Client
┌──────────────────────────▼───────────────────────────────────┐
│                  Data Layer (Prisma ORM + SQLite)            │
│                       Order Table                            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.18.0
- **npm** ≥ 9 (or pnpm / yarn / bun)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/venkateshmangali26/E-Commerce-Sales-Analytics.git
cd E-Commerce-Sales-Analytics
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
E-Commerce-Sales-Analytics/
├── prisma/
│   └── schema.prisma              # Order model with indexed aggregations
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analytics/route.ts # GET /api/analytics (60s cache)
│   │   │   └── orders/route.ts    # GET/POST /api/orders
│   │   ├── page.tsx               # Dashboard entry (6 tabs)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ecommerce/             # 15+ chart components
│   │   └── ui/                    # shadcn/ui primitives
│   └── lib/
│       ├── db.ts                  # Prisma singleton
│       ├── analytics.ts           # Aggregation engine
│       └── ecommerce-data.ts     # Domain config & formatting
├── .github/workflows/ci.yml      # GitHub Actions CI
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🔌 API Reference

### `GET /api/analytics`
Returns aggregated KPIs, monthly trends, regional metrics, category distributions, and correlation data.

| Query Param | Type | Description |
|-------------|------|-------------|
| `refresh`   | `0` \| `1` | Bypass the 60s cache and recompute aggregations |

### `GET /api/orders`
Paginated, filterable recent orders list.

| Query Param | Type | Default | Description |
|-------------|------|---------|-------------|
| `limit`     | int  | 25      | Max 100 |
| `offset`    | int  | 0       | — |
| `search`    | string | — | Matches `customerName` or `productName` |
| `category`  | string | — | Filter by product category |
| `region`    | string | — | Filter by region |
| `payment`   | string | — | Filter by payment method |
| `segment`   | string | — | Filter by customer segment |

### `POST /api/orders`
Create a new order.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS, shadcn/ui |
| Charts | Recharts |
| ORM | Prisma Client |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Language | TypeScript 5 |
| Icons | lucide-react |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## 📈 Analytics Domains Covered

- **Customer Segments:** Consumer · Corporate · Home Office
- **Product Categories:** Electronics · Clothing · Home & Kitchen · Books
- **Payment Methods:** Credit Card · PayPal · Bank Transfer · Debit Card
- **Regions:** APAC · EMEA · Americas

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 👤 Author

**Venkatesh Mangali** — [GitHub](https://github.com/venkateshmangali26)

Project link: [https://github.com/venkateshmangali26/E-Commerce-Sales-Analytics](https://github.com/venkateshmangali26/E-Commerce-Sales-Analytics)
