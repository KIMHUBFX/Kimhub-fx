import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  derivId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  balance: Number,
  referral: String
}, { timestamps: true });

export default mongoose.model('User', userSchema);