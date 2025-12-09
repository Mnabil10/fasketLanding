# Fasket Landing Page — Notes

## Build & run
- Install: `npm install`
- Dev: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Updating screenshots
- Source screenshots live in `public/images` as WebP. Replace the files while keeping names:
  - `Home.webp`, `login.webp`, `cart.webp`, `checkout.webp`, `orderDetails.webp`, `orderSuccess.webp`, `profile.webp`
- For best results export 1440–2400px height, then recompress to WebP (quality ~85–90) to keep performance high.
- Update the `hero.screens` array in `src/locales/en.json` and `src/locales/ar.json` if you change filenames or ordering.
- Hero preload uses `Home.webp` (see `index.html`).

## Updating translations
- All strings live in `src/locales/en.json` and `src/locales/ar.json`.
- Keep keys consistent across both files.
- CTA / device-aware buttons read from `hero.cta` and `cta` sections in the locale files.

## Animations & motion
- Animations use lightweight CSS transitions and keyframes (small 10–20px lift + fade).
- Sections fade in when visible via `SectionShell` (Intersection Observer). Delays are staggered per item.
- The phone mock floats gently; ambient glows create depth. `prefers-reduced-motion` disables animations and smooth scrolling.
- Avoid adding heavy filters; prefer opacity/transform-only transitions.

## Responsive breakpoints
- Desktop wide defaults up to 4K with fluid grids.
- `@media (max-width: 1024px)`: stack hero columns, wrap nav actions, simplify steps connector.
- `@media (max-width: 780px)`: full-width CTAs, tighter metrics, resized phone mock.
- `@media (max-width: 640px)`: smaller headings, single-column stacks for grids/testimonials, compact hero spacing.

## Links & app routing
- PWA: `https://fasket.shop/app`
- Play Store: update the placeholder in `src/locales/*.json` (`contact.playStore`)
- WhatsApp: update `contact.whatsappLink` in locales.
- Navbar/footer/CTA buttons read from these locale values.
