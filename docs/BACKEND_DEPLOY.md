# Backend Deployment Quick Guide

This guide is for deployers who want to launch backend fast.

## Option A: Render (Recommended)

### 1. Create Web Service

- Provider: GitHub
- Repository: `github.com.zxm2013/my`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

### 2. Set Environment Variables

Required:

- `NODE_ENV=production`
- `JWT_SECRET=<strong-random-secret>`
- `CORS_ORIGIN=https://<your-frontend>.netlify.app`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

Database:

- `MONGODB_URI=<mongodb-connection-string>` (recommended for production)

Optional:

- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`

### 3. Deploy and Verify

Render auto deploys after save.

After deploy, test API:

```bash
curl -i https://<your-render-service>.onrender.com/api/auth/check
```

Expected: `401` or `200` (both mean backend is running, auth state differs).

### 4. Connect Frontend (Netlify)

Set Netlify env vars:

- `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api`
- `VITE_SOCKET_URL=https://<your-render-service>.onrender.com`

Then redeploy Netlify.

## Option C: Netlify Frontend + Backend API

Use this when frontend is on Netlify and backend is on Render/VPS.

### 1. Deploy frontend to Netlify

One-click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zxm2013/my)

Or manual settings:

- Base directory: `js/Real-time-chat-app-main/frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `dist`

### 2. Set Netlify env vars

- `VITE_API_BASE_URL=https://<your-backend-domain>/api`
- `VITE_SOCKET_URL=https://<your-backend-domain>`

### 3. Set backend env vars for cross-site auth

- `CORS_ORIGIN=https://<your-netlify-site>.netlify.app`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

### 4. Redeploy frontend

After changing env vars, trigger a new Netlify deploy.

## Option B: Linux VPS (Fast Commands)

```bash
git clone <your-repo-url> /opt/realtime-chat-app
cd /opt/realtime-chat-app/js/Real-time-chat-app-main/backend

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

npm install
cp .env.example .env
```

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Edit `.env` and set:

- `JWT_SECRET=<generated-secret>`
- `MONGODB_URI=<your-mongodb-uri>`
- `CORS_ORIGIN=https://<your-frontend-domain>`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

Run:

```bash
npm start
```

## Troubleshooting

- Blank frontend page: check Netlify env vars and redeploy frontend.
- Login fails across domains: verify `CORS_ORIGIN`, `COOKIE_SAMESITE=none`, `COOKIE_SECURE=true`.
- Socket not connecting: verify `VITE_SOCKET_URL` points to backend root domain.
