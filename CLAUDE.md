# Figma Stats — CLAUDE.md

## Purpose
Personal dashboard displaying usage stats (users, saves, likes) for Abhishek's public Figma plugins, fetched from the Figma REST API via a Vercel serverless function.

## Stack
- **Vite** — dev server + build tool
- **React 18** + **TypeScript** (strict mode)
- **Tailwind v4** — CSS-first, no config file; imported via `@import "tailwindcss"` in `src/index.css`
- **shadcn/ui** — hand-written UI primitives in `src/components/ui/` (card, table, badge)
- **Vercel** — hosting + serverless API in `api/figmaData.js`

## File Structure
```
├── api/
│   └── figmaData.js          # Vercel serverless function — fetches Figma API
├── src/
│   ├── components/ui/        # shadcn/ui primitives (card, table, badge)
│   ├── lib/utils.ts          # cn() helper (clsx + tailwind-merge)
│   ├── App.tsx               # Main layout: stat cards + table
│   ├── PluginStatsTable.tsx  # Stats table component
│   ├── useFetchPlugins.ts    # Data fetching hook with Plugin/Totals types
│   ├── main.tsx              # React 18 entry (createRoot)
│   └── index.css             # Tailwind import + CSS variables
├── index.html                # Vite HTML entry
├── vite.config.ts            # Vite + Tailwind v4 plugin config
└── tsconfig.json             # Strict TypeScript config
```

## Running Locally
```bash
# Install deps
npm install

# Start Vite dev server (http://localhost:5173)
npm run dev

# The API proxy in vite.config.ts forwards /api → localhost:3000
# To test with real data, also run:
vercel dev
```

## Build
```bash
npm run build   # output in dist/
npm run preview # preview production build locally
```

## Key Patterns
- `useFetchPlugins` fetches `/api/figmaData`, maps plugins to add `name` from first version key (with null guard), sorts by `unique_run_count` desc
- `@/*` path alias maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`)
- Tailwind CSS variables defined in `src/index.css` under `:root` power the shadcn component tokens (`--card`, `--muted-foreground`, etc.)
