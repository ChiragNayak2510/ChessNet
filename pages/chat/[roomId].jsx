import { useState, useEffect } from 'react';
import useUserIdStore from '@/libs/store/useUserIdStore';
import useCurrentUserStore from '@/libs/store/useCurrentUserStore';
import io from 'socket.io-client';
import generateChatRoomId from '@/libs/generateRoomId';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FiSend } from "react-icons/fi";      
import { FaChessBoard } from "react-icons/fa6";
import { Chess } from 'chess.js';
import Button from '@/components/Button';
import useUserStore from '@/libs/store/useUserStore';
import usegameStateStore from '@/libs/store/useGameStateStore';
import ChessboardComponent from '@/components/ChessboardComp';
import { toast } from 'react-toastify';
import { set } from 'mongoose';


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = useUserIdStore((state) => state.userId);
  const user = useUserStore((state)=>state.user)
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const [roomId, setRoomId] = useState();
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const gameState = usegameStateStore((state)=>state.gameState)
  const setGameState = usegameStateStore((state)=>state.setGameState)
  const [game,setGame] = useState(new Chess())
  const [gameRequest,setGameRequest] = useState(false)
  const [orientation,setOrientation] = useState()
  const [gameId,setGameId] = useState()
  const [modalState,setModalState] = useState(null)


  function makeAMove(move) {
    let gameCopy = new Chess(game.fen());
    try{
    const result = gameCopy.move(move);
    if (result === null) {
      console.log('Invalid move:', move);
      return null;
    }
    if(result.color!==orientation.slice(0,1)){
      console.log('Invalid move:', move);
      return null;
    }
    console.log('Valid move:', result);
    gameCopy = new Chess(result.after);
    setGame(gameCopy);
    const fen = gameCopy.fen();
    socket.emit('move', game, fen, gameId);
    return result;
    }catch(err){
      console.log(err)
      return;
    } 
  }

  function onDrop(source,target){
    const move = makeAMove({
      from: source,
      to: target,
    });
    if (move === null) return;
  }

  const sendRoomMemberRequest = (roomId) => {
    return new Promise((resolve, reject) => {
      // Listen for the response from the server
      socket.once('onlineCheckResult', (roomMembers) => {
        resolve(roomMembers);
      });
  
      // Send the room member request to the server
      socket.emit('onlineCheck', roomId);
    });
  }
  
  const handleGame = async () => {
      try {
        const roomMembers = await sendRoomMemberRequest(roomId);
    
        console.log(`Number of members in the room: ${roomMembers}`);
    
        // Continue with the rest of your logic based on roomMembers
        if (roomMembers >= 2) {
          setGameId(generateChatRoomId(currentUser.name, ''));
          if(!gameId){
            toast.error('Something went wrong!')
            return;
          }
          console.log(currentUser, gameId);
          setGameState(true);
          const newGame = new Chess()
          setGame(()=>newGame)
          setModalState('request');
          setOrientation('white');
          socket.emit('joinGameRoom', currentUser.name, gameId);
          socket.emit('request', true, roomId, gameId,newGame.fen());
        } else {
          toast.error('User not online');
        }
      } catch (error) {
        toast.error('Error handling game:', error);
      }
  };
  
  

  const acceptRequest = ()=>{
      setGameState(true)
      setGame(game)
      setGameRequest(false)
      setModalState('game')
      setOrientation('black')
      socket.emit('joinGameRoom', currentUser.name,gameId)
      // socket.emit('message',currentUser._id,userId,roomId,"JOINED GAME");
  }

  const declineRequest = ()=>{
      setGameState(false)
      setGameRequest(false)
      socket.emit('decline',gameState,gameId)
  }

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
        { text: data, user: 'Me',date:new Date().toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }) },
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };

  }, [router.asPath,userId]);

  const handleSendMessage = async (e) => {
    e.stopPropagation()
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

  socket?.on('move',(game,fen)=>{
      game = new Chess(fen)
      setGame(game)
      console.log('Received',game.fen())
  })

  socket?.on('request',(gameRequest,gameId,game)=>{
    console.log(game)
    setGameRequest(gameRequest)
    setGameId(gameId)
    const newGame = new Chess(game)
    console.log("here" ,game)
    setGame(()=>newGame)
  })

  socket?.on('declined',(gameState)=>{
    setGameState(gameState)
    setModalState('end')  
  })

  socket?.on('accepted',(game)=>{
    // setGameState(gameState)
    // setGame(game)
    setGame(()=>new Chess())
    setModalState('game')  
  })


  
  if(gameRequest){
    return (<div className='relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-1/2 p-[2rem] py-[4rem] bg-gray-900 rounded-lg flex flex-col justify-center items-center gap-2'>
    <div className='text-white font-bold text-3xl mb-2'>
      {user} sent a game request
    <div className='mt-6'>
    <Button visible={true} label={'Accept'} onClick={acceptRequest}/>
    <Button visible={true} label={'Decline'} onClick={declineRequest}/>
    </div>
  </div>
  </div>
  )
  }

  if(gameState){
    return <>
        <button className='text-white' onClick={()=>{setGameState(false)}}>Close</button> 
        <ChessboardComponent 
        game={game} 
        onDrop={onDrop} 
        orientation={orientation} 
        currentUser={currentUser?.name} 
        user={user} 
        setGameState={setGameState} 
        setGame={setGame} 
        modalState={modalState}
        setModalState={setModalState}
        socket = {socket}
        gameId={gameId}
        sendRoomMemberRequest = {sendRoomMemberRequest}
        roomId = {roomId}
        setOrientation={setOrientation}/>
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
              className="p-4 flex rounded-full bg-gray-700 items-end max-w-1/2 clear-both"
            >
              {message.text}
              <div className='ml-4 opacity-50'>{message.date}</div>  
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-[97%] text-white">
  <div className='flex gap-2 items-center mt-3 p-4 text-lg bg-gray-900 border-2 border-neutral-800 rounded-full text-white'>
    <input className='flex-grow bg-gray-900 text-white outline-none' placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    <div className='cursor-pointer flex items-center gap-5'>
      <button onClick={() => {handleGame()}}>
        <FaChessBoard />
      </button>
      <button onClick={(e)=>handleSendMessage(e)}>
        <FiSend />
      </button>
    </div>
  </div>
</div>

      </div>
    </>
  );
}