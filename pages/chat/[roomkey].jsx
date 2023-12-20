import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useUserIdStore from '@/libs/useUserIdStore';
import useCurrentUserStore from '@/libs/useCurrentUserStore';
import io from 'socket.io-client'
import generateChatRoomId from '@/libs/generateRoomId';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = useUserIdStore((state) => state.userId);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const roomId = generateChatRoomId(userId, currentUser._id);
  const [socket, setSocket] = useState(null);
  const [receivedMessage,setReceivedMessage] = useState('');
  

  useEffect(() => {
    const socketInstance = io.connect('ws://localhost:8080');
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      socketInstance.emit('joinRoom', { roomId, userId });
    });


      socketInstance?.on('message', (data) => {
        console.log('Received message', data);
        setReceivedMessage(data)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data, user: 'Me' },
        ]);
      });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() === '') {
      return;
    }
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, user: 'Me', type: 'outgoing' },
    ]);

    socket.emit('message', roomId, newMessage);

    setNewMessage('');
  };

  
  return (
    <>
      <div className="mt-4 flex-col text-white">
        <div className="ml-auto w-full space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              style={message.type==='outgoing'?{float : 'right'}:{float : 'left'}}
              className="p-4 flex rounded-full bg-gray-700   items-end max-w-1/2 clear-both"
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form className="flex absolute bottom-0 w-full text-white">
        <Input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          placeholder="Type a message"
        ></Input>
        <div className="w-1/5 ml-2">
          <Button visible={true} label="Send" type = "submit" onClick={handleSendMessage}></Button>
          {/* <Button visible={true} label="Left" onClick={handleIncoming}></Button> */}
        </div>
      </form>
    </>
  );
}
