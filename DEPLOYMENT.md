# Deployment Guide

This platform is designed as two deployable services:

- `frontend`: Vite static build.
- `backend`: Express API connected to MongoDB Atlas.

## Environment Variables

Create environment files from the examples:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Never commit real `.env` files. The frontend must only receive `VITE_API_URL`; the MongoDB URI and JWT secret belong only in the backend environment.

## Frontend

Recommended hosts: Vercel, Netlify, or any static hosting service.

Build command:

```bash
npm run build --workspace frontend
```

Output directory:

```bash
frontend/dist
```

Set `VITE_API_URL` to the public backend API URL, for example:

```bash
VITE_API_URL=https://api.example.com/api
```

## Backend

Recommended hosts: Render, Railway, Fly.io, or a VPS.

Start command:

```bash
npm start --workspace backend
```

Required backend variables:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=<MongoDB Atlas connection string>
JWT_SECRET=<long random secret>
CORS_ORIGIN=https://your-frontend-domain.com
```

Optional first admin seed variables:

```bash
ADMIN_SEED_NAME=<admin name>
ADMIN_SEED_EMAIL=<admin email>
ADMIN_SEED_PASSWORD=<temporary strong password>
```

After the first admin is created, remove the seed password from the hosting environment and rotate it if necessary.

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user with a strong password.
3. Add the backend host IP or deployment provider IP range to the network access list.
4. Store the Atlas URI in backend `MONGODB_URI`.

## Production Checklist

- Use HTTPS for frontend and backend.
- Restrict `CORS_ORIGIN` to the real frontend domain.
- Rotate `JWT_SECRET` before launch.
- Remove seed credentials after initial admin creation.
- Enable MongoDB backups.
- Add monitoring and request logs.
- Add image upload storage before using the gallery in production.
