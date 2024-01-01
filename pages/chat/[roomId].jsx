import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useUserIdStore from '@/libs/useUserIdStore';
import useCurrentUserStore from '@/libs/useCurrentUserStore';
import io from 'socket.io-client';
import generateChatRoomId from '@/libs/generateRoomId';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FiSend } from "react-icons/fi";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = useUserIdStore((state) => state.userId);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const [roomId, setRoomId] = useState();
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const [gameState,setGameState] = useState(false)

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/${roomId}`);
      const data = response.data
      if(data.length===0){
        setMessages(message => [])
        return;
      }
          
      const arr = []
      for(let i=0;i<data.length;i++){
        const chat = data[i]
        const date = new Date(chat.timestamp).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })
        if(chat.senderId===currentUser._id){
          setMessages(() => {
            arr.push( { text: chat.message, user: 'Me',type :'outgoing',date:date})
            return arr
          });
        }
        else{
          setMessages(() => {
            arr.push( { text: chat.message, user: 'Me',date:date})
            return arr
          });
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return router.push('/login');
    }
    const initializeChat = async () => {
      setRoomId(generateChatRoomId(userId, currentUser._id));
      await fetchMessages();
    };
    setMessages((messages) => [])
    initializeChat()

    const socketInstance = io.connect('ws://localhost:8080');
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      socketInstance.emit('joinRoom', { roomId, userId });
    });

    socketInstance?.on('message', (data) => {
      console.log('Received message', data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data, user: 'Me' },
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };

  }, [router.asPath,userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() === '') {
      return;
    }
    const senderId = currentUser._id;
    const receiverId = userId;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, user: 'Me', type: 'outgoing', date:new Date().toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })},
    ]);

    socket.emit('message',senderId,receiverId,roomId,newMessage);
    setNewMessage('');
  };

  if(gameState){
    return <>
        
    </>
  }

  
  return (
    <>
    <div className='w-full h-[calc(100vh-90px)] relative pl-6 pr-6'>
      <div className="pt-4 flex-col text-white h-[85vh] overflow-y-auto">
        <div className="ml-auto w-full space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              style={message.type==='outgoing'?{float : 'right'}:{float : 'left'}}
              className="p-4 flex rounded-full bg-gray-700   items-end max-w-1/2 clear-both"
            >
              {message.text}
              <div className='ml-4 opacity-50'>{message.date}</div>
              
            </div>
          ))}
        </div>
      </div>

  <form className="absolute bottom-0 w-[97%] text-white"  onSubmit={(e)=>handleSendMessage(e)}>
  <div className='flex gap-2 items-center mt-3 p-4 text-lg bg-gray-900 border-2 border-neutral-800 rounded-full text-white'>
    <input className='flex-grow bg-gray-900 text-white' placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    <div className='cursor-pointer flex items-center'>
      <button type='submit'>
        <FiSend></FiSend>
      </button>
    </div>
  </div>
</form>
      </div>
    </>
  );
}

{/* <Input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          placeholder="Type a message"
        >
        <FiSend type = "submit" onClick={handleSendMessage}></FiSend>
        </Input> */}