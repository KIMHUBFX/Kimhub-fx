import cron from 'node-cron';
import axios from 'axios';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const updateUserData = async (user) => {
  try {
    const accountResp = await axios.get('https://api.deriv.com/api/v1/account', {
      headers: { 'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` }
    });
    const data = accountResp.data;
    user.balance = data.balance || user.balance;

    const tradesResp = await axios.get(`https://api.deriv.com/api/v1/trades?client_id=${user.derivId}&limit=50`, {
      headers: { 'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` }
    });
    user.trades = tradesResp.data.trades || [];
    await user.save();

    console.log(`Updated user ${user.derivId}`);
  } catch (err) {
    console.error(`Error updating user ${user.derivId}:`, err.message);
  }
};

export const startCronJob = () => {
  const interval = process.env.CRON_INTERVAL || '*/5 * * * *';
  cron.schedule(interval, async () => {
    console.log('Running periodic user update...');
    const users = await User.find();
    for (const user of users) {
      await updateUserData(user);
    }
  });
};