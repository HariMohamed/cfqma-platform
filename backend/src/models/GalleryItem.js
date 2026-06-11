import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: { type: String, required: true },
    category: String,
    description: String,
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
