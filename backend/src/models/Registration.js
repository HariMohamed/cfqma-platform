import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    trackingCode: { type: String, unique: true, sparse: true, index: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    age: Number,
    city: String,
    desiredFormation: String,
    educationLevel: String,
    message: String,
    publicMessage: String,
    status: { type: String, enum: ['new', 'reviewing', 'accepted', 'rejected'], default: 'new' }
  },
  { timestamps: true }
);

registrationSchema.statics.generateTrackingCode = async function generateTrackingCode(date = new Date()) {
  const year = date.getFullYear();
  const prefix = `CFQMA-${year}-`;
  const latest = await this.findOne({ trackingCode: new RegExp(`^${prefix}\\d{5}$`) })
    .sort({ trackingCode: -1 })
    .select('trackingCode')
    .lean();
  const latestNumber = latest?.trackingCode ? Number(latest.trackingCode.slice(-5)) : 0;
  return `${prefix}${String(latestNumber + 1).padStart(5, '0')}`;
};

registrationSchema.pre('validate', async function addTrackingCode(next) {
  if (!this.isNew || this.trackingCode) return next();
  try {
    this.trackingCode = await this.constructor.generateTrackingCode(this.createdAt || new Date());
    return next();
  } catch (error) {
    return next(error);
  }
});

export const Registration = mongoose.model('Registration', registrationSchema);
