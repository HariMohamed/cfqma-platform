import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AdminUser } from '../models/AdminUser.js';
import { AppError, asyncHandler } from '../utils/http.js';

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new AppError('Authentication required', 401);
  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await AdminUser.findById(decoded.id).select('-passwordHash');
  if (!user || !user.isActive) throw new AppError('Invalid admin account', 401);
  req.user = user;
  next();
});
