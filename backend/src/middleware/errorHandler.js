import { ZodError } from 'zod';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(400).json({ success: false, message: 'Validation failed', issues: error.issues });
  }
  const status = error.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : error.message;
  if (status === 500) console.error(error);
  res.status(status).json({ success: false, message });
}
