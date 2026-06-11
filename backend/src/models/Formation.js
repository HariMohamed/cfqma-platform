import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const formationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    sector: { type: String, required: true, index: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    duration: String,
    level: String,
    requirements: [String],
    skills: [String],
    opportunities: [String],
    image: String,
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

formationSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export const Formation = mongoose.model('Formation', formationSchema);
