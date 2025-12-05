import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, derivId: user.derivId, name: user.name, email: user.email, referral: user.referral },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};