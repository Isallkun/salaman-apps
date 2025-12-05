# SALAMAN - B2B Marketplace UMKM

**Solusi Aman Layanan Antar Mitra UMKM Atas Niaga**

A B2B marketplace and escrow system designed for Indonesian MSMEs (UMKM) with AI-powered product verification.

## Features

- 🛒 Product catalog and search
- 💳 Secure payment processing with Midtrans
- 🔒 Escrow system for buyer protection
- 🤖 AI-powered delivery verification using Colossal AI
- 📦 Order tracking and management
- ⚖️ Automated dispute resolution

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment**: Midtrans Snap API
- **AI Vision**: Colossal AI Vision API
- **Testing**: Vitest + fast-check (Property-Based Testing)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Supabase account
- Midtrans sandbox account
- Colossal AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd salaman-apps
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:
- Supabase URL and anon key
- Colossal AI API key
- Midtrans server and client keys

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
salaman-apps/
├── app/                    # Next.js App Router pages
├── actions/                # Server Actions (business logic)
├── components/             # React components
│   └── ui/                # Shadcn/UI components
├── lib/                   # Utility functions and service modules
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── .kiro/specs/          # Feature specifications
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Development Workflow

This project follows a spec-driven development approach. See `.kiro/specs/salaman-b2b-escrow-marketplace/` for:
- `requirements.md` - Feature requirements
- `design.md` - System design and architecture
- `tasks.md` - Implementation tasks

## License

Private - All rights reserved
