# CM Regmi Portfolio & Documentation Hub

Welcome to the **CM Regmi Portfolio** (also known as the `tanstack_start_ts` base). This project serves as the personal portfolio, experimental workbench, and digital documentation hub for **CM Regmi**, a Systems Architect and Digital Strategist specializing in Android kernel optimization, Windows system hardening, and cross-platform architecture.

## 🚀 What is this project about?

The repository is built to provide an immensely fast, edge-ready digital footprint bridging the gap between hardware potential and software execution. It contains various segments detailing professional engineering insights, including:

- **Documentation Hub (`/docs`)**: A central repository for long-form technical documentation, kernel notes, hardening playbooks, and architecture decision records.
- **Labs (`/labs`)**: A digital workbench for experimental tooling, hardware/software prototypes, and various benchmarks.
- **Operator Profile (`/about`)**: Dedicated to a detailed background of CM Regmi's two decades of engineering moving bits between rings, kernels, and userland.
- **Contact & Policies**: Features paths for contact initiation, terms of service, and privacy standards.

## 🛠 Tech Stack & Ecosystem

This project is engineered using a bleeding-edge frontend stack optimized for extreme performance, type safety, and seamless deployments on Cloudflare's Edge.

### Core Frameworks & Libraries

- **[React 19](https://react.dev/)**: The dominant UI library powering the application.
- **[@tanstack/react-start](https://tanstack.com/start/latest)**: A modern, Vite-based full-stack React framework.
- **[@tanstack/react-router](https://tanstack.com/router/latest)**: Fully type-safe and powerful client-side and SSR routing.
- **[@tanstack/react-query](https://tanstack.com/query/latest)**: Powerful asynchronous state management and data caching.

### Styling & UI Architecture

- **[Tailwind CSS v4](https://tailwindcss.com/)**: The utility-first CSS framework for rapid and highly customizable styling (`@tailwindcss/vite`).
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

- **[Vite](https://vitejs.dev/)**: High-performance frontend build tooling.
- **Cloudflare Integration**: Configured entirely for Cloudflare Workers & Pages deployments via `wrangler` (`wrangler.jsonc`) and `@cloudflare/vite-plugin`.
- **TypeScript**: Strict Type checking (`v5.8+`).
- **Linting & Formatting**: Enforced automatically with `ESLint 9` and `Prettier`.

## 📁 Repository Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives (buttons, cards, dialogs, etc.)
│   ├── SiteHeader.tsx   # Global site navigation
│   └── SiteFooter.tsx   # Global site footer
├── hooks/               # Custom React hooks (e.g., use-mobile)
├── lib/                 # Utility functions (e.g., Tailwind merge utilities)
├── routes/              # TanStack Router definitions
│   ├── __root.tsx       # Root layout and context providers
│   ├── index.tsx        # Homepage (Hero, Bento grids, resources)
│   ├── about.tsx        # Operator profile page
│   ├── docs.tsx         # Documentation Hub entry point
│   ├── labs.tsx         # Experimental tooling and benchmarks page
│   └── ...              # Contact, Terms, Policies
├── router.tsx           # Router initialization logic
├── routeTree.gen.ts     # Auto-generated route tree definitions
└── styles.css           # Global CSS variables and Tailwind entry
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
