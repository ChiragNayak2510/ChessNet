require('dotenv').config();
const personalToken = process.env.TOKENSTRING;
import jwt from "jsonwebtoken"
import { connectToDatabase } from './mongo';
import User from './userSchema';

const auth = async (req) => {
  const token = req.body.token;
  if (token == null) {
    throw new Error('Not signed in');
  }
  try {
    const user = jwt.verify(token, personalToken);
    if (!user?.id) {
      throw new Error('Invalid credentials');
    }
    const currentUser = await User.findOne({
      _id : user.id
    }).select('-hashedPassword')
    if(!currentUser)
      throw new Error('User not found')
    return currentUser;
  }
   catch (error) {
    console.error('Authentication error:', error);

    throw new Error('Authentication failed');
  }
};

export default auth;
