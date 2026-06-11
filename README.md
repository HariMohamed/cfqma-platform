# CFQMA Sale Platform

Clean full-stack rebuild for CFQMA Sale: public website, formations, sectors, news, gallery, contact, pre-registration, and admin content management.

## Stack

- Frontend: Vite, React, TailwindCSS, React Router, Axios, Framer Motion, Lucide React
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, dotenv, cors, helmet, express-rate-limit, Zod

## Setup

```bash
cd cfqma-platform
npm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Seed Data

After configuring `backend/.env` with a MongoDB URI and admin seed credentials:

```bash
npm run seed
```

## Security Notes

- Never commit real `.env` files.
- MongoDB URI belongs only in `backend/.env`.
- Frontend only uses `VITE_API_URL`.
- Rotate `JWT_SECRET` before deployment.

## Migrated From Old Project

- Formation names and descriptions were migrated and corrected from `src/Formation.json`.
- Institution/about text was migrated and cleaned from `src/components/test.js`.
- Contact details and map URL were migrated from `src/components/Contact.js`.
- Image assets were copied from the old `public/Pic`, `src/Pics`, and `src/page.jpg` into `frontend/public/images`.
