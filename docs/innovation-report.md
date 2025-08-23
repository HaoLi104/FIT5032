# Innovation Report (Category F)

## Overview
This report documents four implemented innovative features that enhance UX:
1) Appointment Booking with conflict management
2) Bulk Email to selected users with attachment support
3) Public APIs for third-party data access
4) Interactive Charts powered by Firestore data

We also outline recommendations for future improvements.

## 1. Appointment Booking (FullCalendar + Firestore)
- Tech stack: FullCalendar (views: month/week/day), Firestore for persistence
- File: `src/views/BookingView.vue`, service in `src/firebase/config.js` (`bookingService`)
- Capabilities:
  - Create events with title, start/end
  - Conflict detection before write (query events starting before `end`, filter end > `start`)
  - Live updates via `onSnapshot`
  - Delete event via eventClick
- UX rationale: Users avoid overlapping bookings; instant feedback and calendar visualization reduce friction.

## 2. Bulk Email (Cloudflare Pages Functions + Resend)
- Endpoint: `POST /api/bulk-email`
- Files: `functions/api/bulk-email.js`, UI in `src/views/BulkEmailView.vue`
- Capabilities:
  - CSV import or paste list; server chunks recipients and calls Resend API
  - Optional attachment
- UX rationale: Admin/caregiver can notify many users quickly; reduces repetitive work.

## 3. Public APIs (Open REST Routes)
- Endpoints:
  - `GET /api/public/articles`
  - `GET /api/public/events`
- Files: `functions/api/public/articles.js`, `functions/api/public/events.js`
- Data model: mirrors `src/data/mockData.js` shape for easy integration
- UX rationale: Ecosystem growth; third-parties can consume curated data (e.g., councils, partner orgs).

## 4. Interactive Charts (Chart.js + Firestore)
- File: `src/views/ChartsView.vue`
- Data source: Firestore `bookings` via `bookingService.subscribe`
- Visualizations:
  - Bookings per day (bar)
  - Booking duration distribution (line)
- UX rationale: Admin insights; monitor usage patterns and optimize service.

## Accessibility Considerations
- Skip link, high-contrast/large-font toggles, keyboard focus outline.
- Charts include clear titles and color contrast; data can be exported from tables for screen readers.

## Security & Privacy
- Public APIs expose only non-sensitive, curated content.
- Email functions require Cloudflare environment secrets; attachments are transient.

## Deployment Notes
- Cloudflare Pages auto-detects `functions/`.
- Required envs: `RESEND_API_KEY`, optional `MAIL_FROM`, `MAIL_TO_DEFAULT`.

## Future Recommendations
- Booking: server-side composite indexes for robust overlap queries; role-based approvals; reminders.
- Bulk Email: templates, per-user personalization, status webhooks.
- Public API: pagination, ETags, API keys & rate limiting.
- Charts: add cohort analysis (users by role), retention; export images/CSV.
- Offline-first: add service worker, queue writes; local cache for bookings.
- GenAI: integrate Gemini for article summarization and event recommendations.

