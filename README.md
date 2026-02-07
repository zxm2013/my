# Realtime Chat App (pro max)

Production-style full-stack IM based on `MERN + Socket.IO + JWT + Zustand + Tailwind + DaisyUI`.

This repository is prepared for:

- local development and quick demo
- Linux server deployment with `systemd`
- upstream sync workflow for keeping updates in sync

## Features

- JWT signup/login/logout
- realtime private messaging with Socket.IO
- online user indicator
- profile update
- production static build served by backend
- fallback to in-memory MongoDB when `MONGODB_URI` is not provided
- image upload fallback when Cloudinary credentials are missing

## Project Structure

```text
.
|-- backend/
|-- frontend/
|-- deploy/linux/
|-- docs/
|-- scripts/
`-- .github/workflows/
```

## Requirements

- Node.js `20 LTS` (recommended)
- npm `10+`

> Note: Node 25 may break old transitive dependencies. Use Node 20 for stable deployment.

## Quick Start (Local)

1. Install dependencies and build frontend:

```bash
npm run build
```

2. Configure backend env:

```bash
cp backend/.env.example backend/.env
```

3. Start app:

```bash
npm start
```

4. Open:

```text
http://localhost:5001
```

## Environment

Example file: `backend/.env.example`

Key values:

- `PORT=5001`
- `NODE_ENV=production`
- `JWT_SECRET=change_me`
- `MONGODB_URI=` (empty means auto in-memory MongoDB)
- `CLOUDINARY_*` optional

## Linux Deployment

See `docs/LINUX_DEPLOY.md`.

## Keep Sync with Upstream

See `docs/UPSTREAM_SYNC.md`.

Built-in helpers:

- `scripts/sync-upstream.sh`
- `.github/workflows/sync-upstream.yml`

## Scripts

- `npm run build`: install backend/frontend deps and build frontend
- `npm start`: start backend (serves frontend in production mode)
## About
this is powered by Codex-5.3
