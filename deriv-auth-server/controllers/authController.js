import axios from 'axios';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
dotenv.config();

export const derivCallback = async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Missing OAuth code' });

  try {
    // Fetch Deriv account info using API token
    const response = await axios.get('https://api.deriv.com/api/v1/account', {
      headers: { 'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` }
    });

    const data = response.data;

    // Check if user exists, else create
    let user = await User.findOne({ derivId: data.client_id });

    if (!user) {
      user = new User({
        derivId: data.client_id,
        name: data.name || 'John Doe',
        email: data.email || 'john@example.com',
        balance: data.balance || 0,
        referral: process.env.DERIV_REFERRAL_LINK
      });
      await user.save();
    }

    // Generate JWT
    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error('Deriv API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user from Deriv', error: error.message });
  }
};