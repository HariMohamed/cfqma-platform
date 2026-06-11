import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import { AppError } from '../utils/http.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadsDir = path.resolve(__dirname, '../../uploads');

fs.mkdirSync(uploadsDir, { recursive: true });

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg']);
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']);
const maxFileSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsDir);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, extension)
      .normalize('NFKD')
      .replace(/[^\w-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    const safeBaseName = baseName || 'image';
    const suffix = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    callback(null, `${safeBaseName}-${suffix}${extension}`);
  }
});

function fileFilter(req, file, callback) {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(file.mimetype)) {
    return callback(new AppError('Unsupported image type. Allowed: jpg, jpeg, png, webp, svg.', 400));
  }
  callback(null, true);
}

export const imageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFileSize }
});
