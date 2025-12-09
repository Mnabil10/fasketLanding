# Fasket Landing Redesign Notes

## Animation rules
- Use transform/opacity only; lift 10–20px with fade on entry.
- Intersection Observer triggers staggered `.fade-card` reveals; hero/device floats gently.
- Respect `prefers-reduced-motion`: animations and smooth scrolling are minimized.
- Recommended timing curves: ease-out / easeInOut; keep durations under 360ms.

## Spacing system
- Sections: `clamp(56px, 8vw, 104px)` vertical.
- Cards: 18–22px padding with `var(--radius)` rounding.
- Grid gutters: 14–18px for sliders, 16–18px for product/feature grids.

## Color tokens
- `--fasket-primary: #E53935`
- `--fasket-primary-dark: #C62828`
- `--fasket-accent: #FF857A`
- `--fasket-bg: #FFFFFF`
- `--fasket-surface: #FAFAFA`
- `--fasket-muted: #777777`
- `--fasket-dark: #1A1A1A`

## Typography
- Arabic: Cairo
- English: Manrope
- Bold headings, steady letter spacing; body text uses `--fasket-dark` / `--fasket-muted`.

## Responsive breakpoints
- Desktop fluid up to 4K.
- `<=1024px`: hero stacks, nav wraps actions, steps connectors removed.
- `<=780px`: full-width CTAs/metrics, smaller phone mock, tighter gutters.
- `<=640px`: compact headings, single-column grids/testimonials, narrow underline accents.

## Updating screenshots
- Replace WebPs in `public/images`: `Home.webp`, `login.webp`, `cart.webp`, `checkout.webp`, `orderDetails.webp`, `orderSuccess.webp`, `profile.webp`.
- Keep filenames or update `hero.screens` in `src/locales/*.json`.
- Use 1440–2400px height exports, recompress to WebP (quality ~85–90). Hero preloads `Home.webp` in `index.html`.

## Updating icons
- Icons sourced from `lucide-react`; ensure consistent stroke. For custom SVGs, add to `public/images/icons` and reference in components with uniform sizing.

## Build commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
