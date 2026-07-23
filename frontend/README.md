# ServiceHub

A full-stack local-services booking platform. Users browse and book service
providers (electricians, plumbers, painters, etc.); providers manage their
listings and incoming job requests; admins oversee users, providers,
services, and bookings.

## Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React + Vite, React Router, Axios

## Project structure
```
servicehub/
  backend/     Express API (auth, services, bookings)
  frontend/    React + Vite client
```

## Getting it running locally

### 1. Backend
```bash
cd servicehub/backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI to your own MongoDB connection string
npm run dev
```
The API runs on `http://localhost:5000` by default.

Optional — seed some sample service listings:
```bash
node seed.js
```

### 2. Frontend
```bash
cd servicehub/frontend
npm install
npm run dev
```
The app runs on `http://localhost:5173` by default and talks to the API at
`http://localhost:5000/api` (see `src/api/axios.js` if you need to change the
port).

## Roles
Register an account and pick a role at signup:
- **user** — browse services, book providers, track bookings, save favorites
- **provider** — publish service listings, accept/decline job requests
  (requires admin approval before first login)
- **admin** — manage users, approve providers, edit/delete listings, oversee
  all bookings

## Notes on this rebuild
This is a fresh rewrite based on an existing ServiceHub codebase, with a
couple of fixes along the way:
- `validateService` middleware existed but was never wired into the
  `POST /api/services` route — it's now applied.
- The services page previously checked the wrong `localStorage` keys to
  decide if a user was logged in; a shared `api/auth.js` helper now keeps
  that logic consistent across the app.
- Real database credentials that were committed to `.env` have been removed
  and replaced with a placeholder in `.env.example`.

Passwords are currently stored and compared in plain text, matching the
original behavior — worth hashing (e.g. with bcrypt) before using this for
anything beyond a local demo.
