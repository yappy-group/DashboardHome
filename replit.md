# Yappy Report Prototype

## Overview

Yappy is a B2B marketing campaign performance reporting and analytics application. It provides executives and marketing teams with visual dashboards to track campaign performance, engagement metrics, and target account reach. The application features a home dashboard with hero metrics, interactive campaign cards with flip animations, and detailed campaign views. It's built as a full-stack TypeScript application with React frontend and Express backend, designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 4, 2025)

**Navigation Structure (Final):**
- **Main Sections**: Home (Dashboard), Targets, Campaigns, Content, Analytics
- **Each expandable section has submenu items**:
  - Targets: All Targets, Target Lists
  - Campaigns: All Campaigns, Campaign Builder
  - Content: Content Library, Upload/Create
  - Analytics: Campaign Performance, Target Analytics, Content Performance
- Implemented collapsible sidebar - shows only icons by default (80px), expands to full menu (256px)
- Click any icon to expand/collapse entire sidebar
- Click main section headers to expand/collapse submenu items
- Smooth animations with rotating chevron icons showing expand/collapse state
- Semi-transparent overlay when sidebar is expanded; close button (X) to collapse
- Sub-navigation items only visible when sidebar is expanded

**Routing & Pages:**
- /dashboard → Dashboard (home with hero metrics & campaigns)
- /targets → All Targets
- /targets/lists → Target Lists
- /campaigns → All Campaigns
- /campaigns/builder → Campaign Builder
- /content/library → Content Library
- /content/upload → Upload/Create
- /analytics/campaigns → Campaign Performance
- /analytics/targets → Target Analytics
- /analytics/content → Content Performance

**Previous Session Changes:**
- Changed "Export Hero Metrics" button to "Export Chart" 
- Added context text: "Totals shown are all-time; trend indicators show month-on-month change."
- Restyled sidebar: white background, orange accent for active items (#FFF7F0), slim left border
- Added "View Campaign Details" CTA on flip card backs with navigation to individual campaign dashboards
- Fixed Wouter v3+ hydration bug: removed nested anchor tags in Link components
- Uses useRoute hook from wouter for route parameter extraction

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- React Router via Wouter for lightweight client-side routing
- TanStack Query for server state management and data fetching

**UI Component Library**
- Shadcn/ui component system built on Radix UI primitives
- Tailwind CSS with custom Yappy brand theme (orange primary #F77C22, neutral backgrounds)
- Custom CSS variables for consistent theming across light mode
- Lucide React for iconography

**State Management**
- TanStack Query handles server state with infinite stale time and no automatic refetching
- Local component state via React hooks for UI interactions
- No global state management library needed for current scope

**Key Features**
- Flip card animations for campaign cards using CSS 3D transforms
- Hero metrics export functionality (PNG/PDF/CSV) using html2canvas and jsPDF
- Responsive layout with fixed top navigation and collapsible left sidebar
- TypeScript path aliases (@/, @shared/, @assets/) for clean imports

### Backend Architecture

**Server Framework**
- Express.js with TypeScript (ESM modules)
- Separate dev and production entry points (index-dev.ts vs index-prod.ts)
- Custom logging middleware tracking request duration and responses
- Session support via connect-pg-simple (session store configuration present)

**Development vs Production**
- Development mode uses Vite middleware for HMR and SSR
- Production mode serves pre-built static assets from dist/public
- Environment-based configuration via NODE_ENV

**API Design**
- RESTful API structure (routes prefixed with /api)
- Storage abstraction layer (IStorage interface) with in-memory implementation
- Currently uses MemStorage class, designed to be swappable with database implementation

### Data Storage

**Database Configuration**
- Drizzle ORM with PostgreSQL dialect configured
- Neon Database serverless driver (@neondatabase/serverless) as the connection layer
- Schema defined in shared/schema.ts with users table example
- Migrations output to ./migrations directory
- DATABASE_URL environment variable required for database provisioning

**Schema Design**
- User table with UUID primary key, username, and password fields
- Drizzle-Zod integration for type-safe validation schemas
- Shared schema types between client and server via @shared alias

**Current State**
- Storage layer implemented with in-memory fallback (MemStorage)
- Database schema defined but not actively used in application logic
- Ready for database integration when needed

### External Dependencies

**Third-Party UI Libraries**
- Radix UI primitives for accessible component foundations (accordion, dialog, dropdown, tooltip, etc.)
- html2canvas for DOM-to-image conversion (hero metrics export)
- jsPDF for PDF generation from canvas
- Embla Carousel for potential carousel implementations
- React Hook Form with Zod resolvers for form validation

**Development Tools**
- Replit-specific plugins: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- Custom vite-plugin-meta-images for OpenGraph image handling in Replit deployments
- TypeScript compiler with strict mode enabled
- ESBuild for production server bundling

**Asset Management**
- Generated campaign banner images stored in attached_assets/generated_images/
- Public assets served from client/public/
- Custom Vite alias for attached_assets (@assets/)

**Fonts & Styling**
- Plus Jakarta Sans from Google Fonts
- Tailwind CSS with @tailwindcss/vite plugin
- PostCSS with autoprefixer
- Custom Tailwind configuration for Yappy brand colors and design tokens