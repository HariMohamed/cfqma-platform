import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Registration } from '../models/Registration.js';

const missingTrackingQuery = {
  $or: [{ trackingCode: { $exists: false } }, { trackingCode: null }, { trackingCode: '' }]
};

await connectDB();

let updated = 0;
let skipped = 0;
const registrations = await Registration.find(missingTrackingQuery).sort('createdAt _id');

for (const registration of registrations) {
  let assigned = false;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const trackingCode = await Registration.generateTrackingCode(registration.createdAt || new Date());

    try {
      const result = await Registration.updateOne({ _id: registration._id, ...missingTrackingQuery }, { $set: { trackingCode } });
      if (result.modifiedCount > 0) updated += 1;
      else skipped += 1;
      assigned = true;
      break;
    } catch (error) {
      if (error?.code !== 11000) throw error;
    }
  }

  if (!assigned) throw new Error(`Unable to assign tracking code for registration ${registration._id}`);
}

console.log(JSON.stringify({ scanned: registrations.length, updated, skipped }));
await mongoose.disconnect();
