import { connectToDatabase } from '@/libs/mongo';
import User from '../../libs/userSchema';
import bcrypt from 'bcrypt';
require('dotenv').config();
const tokenString = process.env.TOKENSTRING;
const personalToken = tokenString;

const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    throw new Error('Bad request');
  }
  try {
    await connectToDatabase()
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordMatch) {
      const localJwtToken = jwt.sign({id : user._id}, personalToken);
      return res.status(200).json(localJwtToken);
      
    } else {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in authentication:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}
