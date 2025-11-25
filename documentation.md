# Agency Dashboard - System Documentation

## Project Overview

The Agency Dashboard is a Next.js 15 web application that allows authenticated users to view and manage agency and contact information. The application includes user authentication via Clerk, a daily contact view limit system, and an upgrade prompt for premium access.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.0 | React framework with App Router |
| React | 19.0.0 | UI library |
| Clerk | 6.9.0 | Authentication provider |
| Tailwind CSS | 3.4.16 | Styling |
| Radix UI | Various | Accessible UI components |
| TypeScript | 5.7.2 | Type safety |

---

## Architecture

### Application Structure

```
agency-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Clerk & Theme providers
│   ├── page.tsx                 # Landing page
│   ├── sign-in/[[...sign-in]]/ # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/ # Clerk sign-up page
│   └── dashboard/              # Protected dashboard routes
│       ├── layout.tsx          # Dashboard layout with sidebar
│       ├── page.tsx            # Dashboard home
│       ├── agencies/           # Agencies table page
│       └── contacts/           # Contacts table page
├── components/
│   ├── app-sidebar.tsx         # Navigation sidebar
│   ├── theme-provider.tsx      # Dark/light theme support
│   ├── upgrade-modal.tsx       # Upgrade prompt modal
│   └── ui/                     # Reusable UI components
├── hooks/
│   └── use-contact-views.ts    # Contact view tracking hook
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.ts                 # Data fetching utilities
│   ├── contact-limit.ts        # Daily limit logic
│   └── utils.ts                # Utility functions
├── middleware.ts               # Clerk authentication middleware
└── public/data/                # JSON data files
```

---

## Core Features

### 1. Authentication (Clerk)

- **Sign Up/Sign In**: Users authenticate via Clerk's hosted UI components
- **Route Protection**: Middleware protects `/dashboard/*` routes
- **Public Routes**: `/`, `/sign-in`, `/sign-up` are publicly accessible

```typescript
// middleware.ts
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);
```

### 2. Agencies View

- Displays all agencies in a paginated table
- Shows agency details: name, state, type, population, contact info
- No viewing restrictions for agency data

### 3. Contacts View with Daily Limit

- **Daily Limit**: 50 contacts per user per day
- **Tracking**: Uses localStorage with user ID and date-based keys
- **Upgrade Prompt**: Modal appears when limit is reached

```typescript
// Storage key format
`contact_views_${userId}_${YYYY-MM-DD}`
```

### 4. Upgrade Modal

Displays when daily limit is exceeded, showing:
- Current limit notification
- Pro plan benefits
- Pricing ($29/month placeholder)
- No actual payment integration

---

## Data Flow

### Authentication Flow

```
User visits /dashboard
    ↓
Middleware checks auth state
    ↓
┌─────────────────────────────────────┐
│ Authenticated?                      │
├─────────────┬───────────────────────┤
│ YES         │ NO                    │
│ Allow       │ Redirect to /sign-in  │
└─────────────┴───────────────────────┘
```

### Contact View Flow

```
User clicks to view contact
    ↓
Check localStorage for today's views
    ↓
┌─────────────────────────────────────┐
│ Views < 50?                         │
├─────────────┬───────────────────────┤
│ YES         │ NO                    │
│ Show contact│ Show upgrade modal    │
│ Increment   │                       │
└─────────────┴───────────────────────┘
```

---

## Data Models

### Agency

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Agency name |
| state | string | Full state name |
| state_code | string | State abbreviation |
| type | string | Agency type |
| population | string | Population served |
| website | string | Agency website |
| total_schools | string | Number of schools |
| total_students | string | Number of students |
| mailing_address | string | Mailing address |
| physical_address | string | Physical address |
| phone | string | Contact phone |
| county | string | County location |

### Contact

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| first_name | string | First name |
| last_name | string | Last name |
| email | string | Email address |
| phone | string | Phone number |
| title | string | Job title |
| department | string | Department |
| agency_id | string | Related agency ID |

---

## API / Data Access

The application uses static JSON files for data:

```typescript
// lib/data.ts
export function getAgencies(): Agency[]
export function getContacts(): Contact[]
export function getAgencyById(id: string): Agency | undefined
export function getContactsByAgencyId(agencyId: string): Contact[]
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route |

---

## Deployment

### Recommended Platform: Vercel

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

---

## Security Considerations

1. **Authentication**: All dashboard routes protected via Clerk middleware
2. **Client-side Limit**: Contact limit uses localStorage (can be bypassed by clearing storage)
3. **No Backend**: Data is static JSON, no database security concerns

---

## Future Improvements

- [ ] Server-side contact limit tracking (database)
- [ ] Payment integration (Stripe)
- [ ] Export functionality for Pro users
- [ ] Advanced search and filtering
- [ ] Agency-Contact relationship views
