# Agency Dashboard

A Next.js 15 dashboard application for managing agencies and contacts with Clerk authentication and daily contact view limits.

## Features

- **Authentication**: Secure sign-in/sign-up with Clerk
- **Agencies Table**: Browse 921 agencies (cities & counties)
- **Contacts Table**: View 999 employee contacts with daily limits
- **Daily Limit**: 50 contact views per day on free plan
- **Upgrade Prompt**: Modal prompts users when limit is reached
- **Dark/Light Mode**: Theme toggle support
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk
- **UI**: shadcn/ui (New York style) + Tailwind CSS
- **Icons**: Tabler Icons + Lucide
- **Deployment**: Vercel

## System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 15 Application                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Clerk Middleware                        │   │
│  │         (Authentication Guard)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│              ┌───────────────┴───────────────┐              │
│              ▼                               ▼              │
│  ┌─────────────────────┐        ┌─────────────────────┐    │
│  │   Public Routes     │        │  Protected Routes   │    │
│  │  - /sign-in         │        │  - /dashboard       │    │
│  │  - /sign-up         │        │  - /dashboard/      │    │
│  │  - /                │        │    agencies         │    │
│  └─────────────────────┘        │  - /dashboard/      │    │
│                                 │    contacts         │    │
│                                 └─────────────────────┘    │
│                                            │                │
│                                            ▼                │
│                          ┌─────────────────────────────┐   │
│                          │    Contact View Limiter     │   │
│                          │  (50 views/day per user)    │   │
│                          │  - localStorage tracking    │   │
│                          │  - Daily reset at midnight  │   │
│                          └─────────────────────────────┘   │
│                                            │                │
│                          ┌─────────────────┴─────────────┐ │
│                          ▼                               ▼ │
│               ┌──────────────────┐          ┌────────────┐ │
│               │ Static JSON Data │          │  Upgrade   │ │
│               │ - agencies.json  │          │   Modal    │ │
│               │ - contacts.json  │          │ (on limit) │ │
│               └──────────────────┘          └────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Clerk Auth Service                      │
│              (User Authentication & Sessions)                │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   User       │────▶│  Clerk Auth     │────▶│  Dashboard       │
│   Request    │     │  (Middleware)   │     │  (Protected)     │
└──────────────┘     └─────────────────┘     └──────────────────┘
                                                      │
                     ┌────────────────────────────────┤
                     ▼                                ▼
           ┌─────────────────┐              ┌─────────────────┐
           │  Agencies Page  │              │  Contacts Page  │
           │  (No Limit)     │              │  (50/day Limit) │
           └─────────────────┘              └─────────────────┘
                     │                                │
                     ▼                                ▼
           ┌─────────────────┐              ┌─────────────────┐
           │ agencies.json   │              │ localStorage    │
           │ (921 records)   │              │ View Tracking   │
           └─────────────────┘              └─────────────────┘
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
agency-dashboard/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles & CSS variables
│   ├── page.tsx                # Landing page
│   ├── sign-in/                # Clerk sign-in
│   ├── sign-up/                # Clerk sign-up
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout with sidebar
│       ├── page.tsx            # Dashboard overview
│       ├── agencies/           # Agencies table
│       └── contacts/           # Contacts table with limit
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── app-sidebar.tsx         # Navigation sidebar
│   ├── upgrade-modal.tsx       # Limit exceeded modal
│   └── theme-provider.tsx      # Theme context
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── types.ts                # TypeScript types
│   ├── data.ts                 # Data loading functions
│   └── contact-limit.ts        # Daily limit logic
├── hooks/
│   └── use-contact-views.ts    # Contact view tracking hook
└── public/data/
    ├── agencies.json           # Agency data
    └── contacts.json           # Contact data
```

## License

MIT
