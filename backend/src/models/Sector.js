import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const sectorSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    image: String,
    formations: [String],
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

sectorSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export const Sector = mongoose.model('Sector', sectorSchema);
