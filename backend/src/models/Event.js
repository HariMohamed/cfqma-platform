import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    type: {
      type: String,
      enum: ['exhibition', 'event', 'workshop', 'announcement'],
      default: 'event'
    },
    excerpt: String,
    description: String,
    date: { type: Date, required: true, index: true },
    endDate: Date,
    location: String,
    coverImage: String,
    galleryImages: [String],
    participants: [String],
    relatedFormations: [String],
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

eventSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export const Event = mongoose.model('Event', eventSchema);
