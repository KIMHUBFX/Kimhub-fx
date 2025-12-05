import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  trade_id: String,
  symbol: String,
  amount: Number,
  profit: Number,
  timestamp: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
  derivId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  balance: Number,
  referral: String,
  referralCount: { type: Number, default: 0 },
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  trades: [tradeSchema],
}, { timestamps: true });

export default mongoose.model('User', userSchema);