# Realtime Chat App (Advanced Local Edition)

Production-style full-stack IM based on `MERN + Socket.IO + JWT + Zustand + Tailwind + DaisyUI`.

 [中文文档入口](https://github.com/zxm2013/my/blob/main/docs/BACKEND_DEPLOY.zh-CN.md)

This repository is prepared for:

- local development and quick demo
- Linux server deployment with `systemd`
- one-click Netlify frontend deployment
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

## Pure Linux Deployment (Frontend + Backend)

Use this when you want both frontend and backend hosted on one Linux server.

```bash
git clone https://github.com/zxm2013/my.git /opt/realtime-chat-app
cd /opt/realtime-chat-app/js/Real-time-chat-app-main

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx build-essential

npm run build
cp backend/.env.example backend/.env
```

Edit `backend/.env` (required):

- `JWT_SECRET=<strong-secret>`
- `MONGODB_URI=<your-mongo-uri>` (or leave empty for in-memory demo mode)
- `CORS_ORIGIN=https://<your-domain>`

Start backend:

```bash
cd /opt/realtime-chat-app/js/Real-time-chat-app-main/backend
npm install
npm start
```

Configure Nginx to serve frontend and proxy backend/socket:

```nginx
server {
    listen 80;
    server_name _;

    root /opt/realtime-chat-app/js/Real-time-chat-app-main/frontend/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:5001/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Apply Nginx:

```bash
sudo systemctl restart nginx
```

## Backend Deployment (Fast)

See `docs/BACKEND_DEPLOY.md` for deployer-focused steps and commands:

- Render setup (recommended)
- Linux VPS command flow
- Netlify frontend binding with backend URL

## One-Click Netlify Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zxm2013/my)

Netlify setup can be tricky in monorepo/cross-origin cases.
For correct Netlify + backend configuration, see: `docs/BACKEND_DEPLOY.md`

## Keep Sync with Upstream

See `docs/UPSTREAM_SYNC.md`.

Built-in helpers:

- `scripts/sync-upstream.sh`
- `.github/workflows/sync-upstream.yml`

## Scripts

- `npm run build`: install backend/frontend deps and build frontend
- `npm start`: start backend (serves frontend in production mode)

## License

Use your own license policy before publishing publicly.
