import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AdminUser } from '../models/AdminUser.js';
import { AppError, asyncHandler, sendData } from '../utils/http.js';

function sign(user) {
  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export const login = asyncHandler(async (req, res) => {
  const user = await AdminUser.findOne({ email: req.body.email.toLowerCase(), isActive: true });
  if (!user) throw new AppError('Invalid credentials', 401);
  const ok = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!ok) throw new AppError('Invalid credentials', 401);
  user.lastLoginAt = new Date();
  await user.save();
  sendData(res, {
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const me = asyncHandler(async (req, res) => {
  sendData(res, req.user);
});
