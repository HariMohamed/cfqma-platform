import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { assertEnv, env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { publicRoutes } from './routes/publicRoutes.js';

assertEnv();
await connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 120 }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => res.json({ success: true, service: 'cfqma-api' }));
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => console.log(`CFQMA API running on port ${env.port}`));
