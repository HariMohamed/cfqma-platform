import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    age: Number,
    city: String,
    desiredFormation: String,
    educationLevel: String,
    message: String,
    status: { type: String, enum: ['new', 'reviewing', 'accepted', 'rejected'], default: 'new' }
  },
  { timestamps: true }
);

export const Registration = mongoose.model('Registration', registrationSchema);
