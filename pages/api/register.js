import bcrypt from 'bcrypt'
import User from '../../libs/userSchema';
import { connectToDatabase } from '@/libs/mongo';
require('dotenv').config();
const personalToken = process.env.TOKENSTRING;;
const jwt = require('jsonwebtoken');

export default async function handler(req,res){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
try{
    await connectToDatabase();
    const {name,username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,12)
    const user = await User.create({
            name,
            username,
            email,
            hashedPassword
    });
    const localJwtToken = jwt.sign({ id : user._id }, personalToken);
    return res.status(200).json(localJwtToken);
} catch(error){
    console.log(error)
    return res.status(400).end()
}
}       
