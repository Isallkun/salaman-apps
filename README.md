# 🛡️ SALAMAN

**Solusi Aman Layanan Antar Mitra Atas Niaga**

> A secure B2B marketplace with AI-powered escrow system for Indonesian MSMEs (UMKM)

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)

## 🎯 Overview

SALAMAN is a B2B marketplace platform that solves trust issues between small business owners (warung) and suppliers in Indonesia. Using an escrow system combined with AI-powered delivery verification, we ensure safe transactions for both parties.

### The Problem
- Buyers fear paying upfront without receiving goods
- Suppliers worry about shipping goods without payment guarantee
- Quality disputes are common and hard to resolve

### Our Solution
- **Escrow Payment**: Funds are held securely until delivery is verified
- **AI Verification**: Automatic quality check using computer vision
- **Automated Resolution**: Smart dispute handling with evidence-based decisions

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛒 **Product Catalog** | Browse and search products from verified suppliers |
| 💳 **Secure Payments** | Midtrans integration with multiple payment methods |
| 🔒 **Escrow Protection** | Funds held until delivery confirmation |
| 🤖 **AI Verification** | Colossal AI vision for delivery proof validation |
| 📦 **Order Tracking** | Real-time status updates and tracking |
| 💬 **AI Chat Assistant** | Powered by Colossal AI for customer support |

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment Gateway**: Midtrans Snap API
- **AI Services**: Colossal AI (Vision + Chat)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- Supabase account
- Midtrans sandbox account
- Colossal AI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Isallkun/salaman-apps.git
cd salaman-apps

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Midtrans
MIDTRANS_SERVER_KEY=your_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key

# Colossal AI
COLOSSAL_API_KEY=your_api_key
```

### Database Setup

1. Create a new Supabase project
2. Run migrations from `supabase/migrations/`
3. Seed data from `supabase/seed/`
4. Create storage bucket named `delivery-proofs`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
salaman-apps/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (webhooks)
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── marketplace/       # Product listing
│   ├── orders/            # Order management
│   └── product/           # Product details
├── actions/               # Server Actions
├── components/            # React components
│   ├── chat/             # AI chat widget
│   ├── landing/          # Landing page sections
│   ├── marketplace/      # Product components
│   ├── order/            # Order components
│   └── ui/               # Shadcn/UI components
├── lib/                   # Utilities & services
│   ├── colossal.ts       # Colossal AI integration
│   ├── midtrans.ts       # Payment integration
│   └── supabase.ts       # Database client
├── types/                 # TypeScript definitions
└── supabase/             # Database migrations & seeds
```

## 🔄 Transaction Flow

```
1. Buyer browses marketplace
2. Buyer adds products to cart
3. Buyer proceeds to checkout
4. Payment processed via Midtrans
5. Funds held in escrow
6. Supplier ships the order
7. Buyer receives & photographs delivery
8. AI verifies delivery proof
9. Funds released to supplier
```

## 🧪 Demo Mode

For hackathon presentation, use the demo simulation buttons:

1. **Demo Login**: Use the "Demo Login (Buyer)" button on login page
2. **Simulate Payment**: Click "Simulasi: Pembayaran Berhasil" on order detail
3. **Simulate Shipping**: Click "Simulasi: Supplier Kirim Barang"
4. **Upload Proof**: Upload any image for AI verification

### Test Payment (Midtrans Sandbox)
- Card: `4811 1111 1111 1114`
- CVV: `123`
- Expiry: `12/25`
- OTP: `112233`

## 🌐 Deployment

The app is deployed on Vercel:
- **Production**: https://salaman-apps.vercel.app
- **Webhook URL**: https://salaman-apps.vercel.app/api/webhooks/midtrans

## 📝 License

This project was built for hackathon purposes.

---

Built with ❤️ for Indonesian MSMEs
