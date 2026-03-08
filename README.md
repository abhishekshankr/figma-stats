# Figma Stats

Personal dashboard displaying usage stats for [Abhishek's Figma plugins](https://www.figma.com/@abhishekshankar) — users, saves, and likes, fetched live from the Figma API.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind v4** (CSS-first, no config file)
- **shadcn/ui** component primitives
- **Vercel** — hosting + serverless API

## Development

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
```

The dev server proxies `/api` to `localhost:3000`. To test with real Figma data, run the Vercel dev server alongside:

```bash
vercel dev        # starts API at localhost:3000
```

## Build & Deploy

```bash
npm run build     # output in dist/
npm run preview   # preview production build locally
```

Deploys automatically to Vercel on push to `main`.

## Project Structure

```
├── api/
│   └── figmaData.js          # Vercel serverless function
├── src/
│   ├── components/ui/        # shadcn/ui primitives (card, table, badge)
│   ├── lib/utils.ts          # cn() helper
│   ├── App.tsx               # Main layout
│   ├── PluginStatsTable.tsx  # Stats table
│   ├── useFetchPlugins.ts    # Data fetching hook
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind import + CSS variables
├── index.html
├── vite.config.ts
└── tsconfig.json
```
