import Chats from '@/libs/chatSchema';
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    throw new Error('Bad request');
  }

  try {
    await connectToDatabase();

    const { roomId } = req.query;
    const messages = await Chats.find({ roomId }).sort({ timestamp: 1 }); 
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error', error);
    return res.status(405).end();
  }
}
