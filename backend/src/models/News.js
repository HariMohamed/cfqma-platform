import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: String,
    category: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: Date
  },
  { timestamps: true }
);

newsSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export const News = mongoose.model('News', newsSchema);
