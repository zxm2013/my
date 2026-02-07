# 后端部署快速指南（中文）

本文面向部署者，目标是最快把后端跑起来并与前端联通。

## 单独后端 Render（无前端）

### 1. 新建 Web Service

- 平台：Render
- 代码源：GitHub 仓库 `github.com/zxm2013/my`
- Root Directory：`backend`
- Runtime：`Node`
- Build Command：`npm install`
- Start Command：`npm start`

### 2. 配置环境变量

必填：

- `NODE_ENV=production`
- `JWT_SECRET=<强随机字符串>`
- `CORS_ORIGIN=https://<你的前端域名>.netlify.app`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

数据库：

- `MONGODB_URI=<MongoDB连接串>`（生产建议必须配置）

可选（图片上传）：

- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`

### 3. 验证后端

```bash
curl -i https://<your-render-service>.onrender.com/api/auth/check
```

返回 `401` 或 `200` 都表示服务已启动（只是登录态不同）。

## 方案B：Netlify 前端 + 独立后端

### 1. 部署前端到 Netlify

一键部署：

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zxm2013/my)

手动参数：

- Base directory：`js/Real-time-chat-app-main/frontend`
- Build command：`npm ci && npm run build`
- Publish directory：`dist`

### 2. Netlify 环境变量

- `VITE_API_BASE_URL=https://<你的后端域名>/api`
- `VITE_SOCKET_URL=https://<你的后端域名>`

### 3. 后端跨域与Cookie参数

- `CORS_ORIGIN=https://<你的netlify站点>.netlify.app`
- `COOKIE_SAMESITE=none`
- `COOKIE_SECURE=true`

### 4. 重新部署前端

修改环境变量后，必须在 Netlify 重新触发一次部署。

## 方案C：纯 Linux VPS（前后端都在同一台机器）

```bash
git clone <your-repo-url> /opt/realtime-chat-app
cd /opt/realtime-chat-app/js/Real-time-chat-app-main

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx build-essential

npm run build
cp backend/.env.example backend/.env
```

生成 JWT 密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

编辑 `backend/.env`：

- `JWT_SECRET=<生成的密钥>`
- `MONGODB_URI=<你的Mongo连接串>`（可留空做演示）
- `CORS_ORIGIN=https://<你的域名>`

启动后端：

```bash
cd /opt/realtime-chat-app/js/Real-time-chat-app-main/backend
npm install
npm start
```

常见问题：

- 页面空白：检查 Netlify 变量是否正确并重部署前端。
- 登录失败：检查 `CORS_ORIGIN`、`COOKIE_SAMESITE=none`、`COOKIE_SECURE=true`。
- Socket 连不上：检查 `VITE_SOCKET_URL` 是否为后端根域名（不带 `/api`）。
