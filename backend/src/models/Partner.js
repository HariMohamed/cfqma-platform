import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    logo: { type: String, trim: true },
    url: { type: String, trim: true },
    alt: { type: String, trim: true },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Partner = mongoose.model('Partner', partnerSchema);
