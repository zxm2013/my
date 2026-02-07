@ -6,6 +6,7 @@ This repository is prepared for:

- local development and quick demo
- Linux server deployment with `systemd`
- one-click Netlify frontend deployment
- upstream sync workflow for keeping updates in sync

## Features
@ -79,6 +80,23 @@ Key values:

See `docs/LINUX_DEPLOY.md`.

## One-Click Netlify Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zxm2013/my)

Netlify deploys the `frontend` as static files. You still need a backend URL for auth/socket APIs.

Set these in Netlify Site Environment Variables:

- `VITE_API_BASE_URL=https://<your-backend-domain>/api`
- `VITE_SOCKET_URL=https://<your-backend-domain>`

For cross-site cookies on backend, set in `backend/.env`:

- `CORS_ORIGIN=https://<your-netlify-site>.netlify.app`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

## Keep Sync with Upstream

See `docs/UPSTREAM_SYNC.md`.
