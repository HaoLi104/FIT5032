# SeniorConnect Hub

A Vue 3 + Vite application for seniors and caregivers, featuring:
- Firebase Authentication (email/password)
- Email sending with attachments via Cloudflare Pages Functions (Resend API)
- Interactive tables (search, sort, pagination) and CSV/PDF export
- Map with place search and routing (Leaflet + Nominatim + OSRM)
- Accessibility (WCAG 2.1 AA): skip link, high-contrast, large font, keyboard focus

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint

## Cloudflare Pages Deployment

1. Connect this repo to Cloudflare Pages.
2. Build command: `npm run build`  | Build output: `dist`
3. Functions: ensure `functions/` folder is included; Pages will auto-detect.
4. Set environment variables in Pages → Settings → Environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `MAIL_FROM`: Optional. e.g. `SeniorConnect Hub <no-reply@your-domain.com>`
   - `MAIL_TO_DEFAULT`: Optional fallback recipient when client omits `to`

### Test the Email Function

- Route: `POST /api/send-email` with `multipart/form-data`
- Fields: `to`, `subject`, `message`, optional `attachment`
- Frontend form: `/tools/email`

## Features & Routes

- Auth: `/login`, `/register`
- Email tool: `/tools/email` (requires login)
- Data tables: `/tools/tables` (requires login)
- Map: `/tools/map` (requires login)
- Accessibility settings: `/account/settings/accessibility` (requires login)
 - Booking calendar: `/tools/booking` (requires login)
 - Bulk email: `/tools/bulk-email` (requires login)
 - Charts (Firestore): `/tools/charts` (requires login)

## Innovation Features (Category F)

- Appointment Booking with conflict management (FullCalendar + Firestore)
- Bulk Email with CSV and attachment (Cloudflare Function + Resend)
- Public APIs: `GET /api/public/articles`, `GET /api/public/events`
- Interactive Charts (Chart.js) fed by Firestore `bookings`

Details: see `docs/innovation-report.md`.

## Accessibility

- Skip link is available before `#app` in `index.html`
- Toggle high contrast and large font in Accessibility Settings
- Keyboard focus outline can be forced via the same page
```
