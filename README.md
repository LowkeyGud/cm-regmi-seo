# CM Regmi Portfolio & Documentation Hub

Welcome to the **CM Regmi Portfolio & Documentation Hub**. This project serves as the personal portfolio and digital documentation hub for **CM Regmi**, a Systems Architect and Digital Strategist specializing in Android kernel optimization, Windows system hardening, and cross-platform architecture.

## 🚀 What is this project about?

The repository is built to provide an immensely fast, edge-ready digital footprint bridging the gap between hardware potential and software execution. It contains various segments detailing professional engineering insights, including:

- **Documentation Hub (`/docs`)**: A central repository for long-form technical documentation, kernel notes, hardening playbooks, and architecture decision records.
- **Labs (`/labs`)**: A digital workbench for experimental tooling, hardware/software prototypes, and various benchmarks.
- **Operator Profile (`/about`)**: Dedicated to a detailed background of CM Regmi's two decades of engineering moving bits between rings, kernels, and userland.
- **Contact & Policies**: Features paths for contact initiation, terms of service, and privacy standards.

## 🛠 Tech Stack & Ecosystem

This project is built with the Next.js App Router for static-first rendering (SSG/SSR), type safety, and fast edge delivery. It is deployed on **Vercel**, with DNS managed on **Cloudflare**.

### Core Frameworks & Libraries

- **[Next.js 15 (App Router)](https://nextjs.org/)**: React framework with static generation (SSG) and server-side rendering (SSR).
- **[React 19](https://react.dev/)**: The dominant UI library powering the application.

### Styling & UI Architecture

- **[Tailwind CSS v4](https://tailwindcss.com/)**: The utility-first CSS framework for rapid and highly customizable styling (`@tailwindcss/postcss`).
- **[shadcn/ui](https://ui.shadcn.com/) & Radix UI**: An extensive implementation of highly accessible, unstyled primitives (`@radix-ui/*`). Custom components include Dialogs, Tooltips, Navigation Menus, Accordions, Sliders, and more.
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icon set.

### Advanced Form & Data Validation

- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation.
- **`@hookform/resolvers`**: Bridges Zod with React Hook Form seamlessly.

### Feature-rich Dependencies

- **Charts & Data**: `recharts` for responsive data visualizations.
- **Carousels**: `embla-carousel-react` for smooth, touch-friendly swipe carousels.
- **Toasts**: `sonner` for incredibly easy and attractive toast notifications.
- **Drawers & Modals**: `vaul` for unstyled drawer components designed for mobile/desktop.
- **Calendars & Dates**: `date-fns` alongside `react-day-picker` for date manipulation and robust date picker widgets.
- **Layout Management**: `react-resizable-panels` for draggable, resizable split-pane layouts.
- **OTP Inputs**: `input-otp` for seamless one-time password entries.
- **Command Palettes**: `cmdk` for fast, accessible command menu interfaces.

### Build Tools & Deployment

- **[Vercel](https://vercel.com/)**: Production hosting and edge delivery; DNS is managed on Cloudflare.
- **TypeScript**: Strict type checking (`v5.8+`).
- **Linting & Formatting**: Enforced automatically with `ESLint 9` and `Prettier`.

## 📁 Repository Structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Homepage (hero, documentation preview)
│   ├── about/           # Operator profile page
│   ├── contact/         # Contact page with functional form
│   ├── docs/            # Documentation Hub (28 long-form articles)
│   ├── privacy-policy/  # Privacy policy
│   ├── terms-of-service/# Terms of service
│   ├── ads-and-cookies/ # Ads & cookies policy
│   ├── sitemap.ts       # Generated sitemap.xml
│   └── layout.tsx       # Root layout (metadata, consent mode, AdSense)
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives (buttons, cards, dialogs, etc.)
│   ├── SiteHeader.tsx   # Global site navigation
│   ├── SiteFooter.tsx   # Global site footer
│   ├── CookieConsent.tsx# Google Consent Mode v2 banner
│   └── AdsSlot.tsx      # AdSense ad slot component
├── lib/                 # Utility functions (e.g., Tailwind merge utilities)
└── styles/              # Global CSS (globals.css)
```

## 💻 Local Development

Before running the application locally, ensure you have an updated version of Node.js and your preferred package manager (npm or bun).

1. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. **Format & Lint:**

   ```bash
   npm run format
   npm run lint
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```

## 🛡 License & Assets

The contents and technical insights contained within this repository are generated and maintained by **CM Regmi**. All documentation, hacks, architecture records, and experimental code are proprietary unless expressly open-sourced under the explicit repository license.

_Designed for maximum telemetry evasion, edge-cached response times, and an unapologetic reverence for raw performance._
