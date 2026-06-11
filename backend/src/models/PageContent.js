import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, trim: true, index: true },
    locale: { type: String, required: true, enum: ['fr', 'ar', 'en'], default: 'fr', index: true },
    sections: [{ type: mongoose.Schema.Types.Mixed }]
  },
  { timestamps: true }
);

pageContentSchema.index({ pageKey: 1, locale: 1 }, { unique: true });

export const PageContent = mongoose.model('PageContent', pageContentSchema);
