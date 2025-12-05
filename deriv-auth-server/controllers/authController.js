import axios from 'axios';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
dotenv.config();

const fetchDerivUser = async () => {
  const response = await axios.get('https://api.deriv.com/api/v1/account', {
    headers: { 'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` }
  });
  return response.data;
};

const fetchDerivTrades = async (derivId) => {
  const response = await axios.get(`https://api.deriv.com/api/v1/trades?client_id=${derivId}&limit=50`, {
    headers: { 'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` }
  });
  return response.data.trades || [];
};

export const derivCallback = async (req, res) => {
  const { code, referralCode } = req.body;

  try {
    const data = await fetchDerivUser();

    let user = await User.findOne({ derivId: data.client_id });

    if (!user) {
      user = new User({
        derivId: data.client_id,
        name: data.name || 'John Doe',
        email: data.email || 'john@example.com',
        balance: data.balance || 0,
        referral: process.env.DERIV_REFERRAL_LINK,
        referralCount: 0
      });

      if (referralCode) {
        const referrer = await User.findOne({ derivId: referralCode });
        if (referrer) {
          referrer.referralCount += 1;
          referrer.referredUsers.push(user._id);
          await referrer.save();
        }
      }

      await user.save();
    } else {
      user.balance = data.balance || user.balance;
    }

    user.trades = await fetchDerivTrades(user.derivId);
    await user.save();

    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error('Deriv API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user or trades', error: error.message });
  }
};