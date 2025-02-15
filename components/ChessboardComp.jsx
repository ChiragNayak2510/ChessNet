import { Chessboard } from 'react-chessboard';
import { CiFlag1 } from "react-icons/ci";
import { CgInfo } from "react-icons/cg";
import { Chess } from 'chess.js';
import Spinner from './Spinner';
import { useState } from 'react'

export default function ChessboardComponent({ game, onDrop ,orientation,currentUser,user,setGameState,setGame,modalState,setModalState,socket,gameId,sendRoomMemberRequest,roomId,setOrientation}) {
        
      const [result,setResult] = useState()

        const handleClick = async(modalState)=>{
          if(modalState==='game'){
          console.log('abort')
          socket.emit('abort','end',gameId)
          if(orientation==='white')setResult('White resigned! Black is victorious.')
          else setResult('Black resigned! White is victorious.')
          setModalState('end')
          // setGameState(false)
          //setGame(new Chess())
          }
          else{
            try {
              const roomMembers = await sendRoomMemberRequest(roomId);
          
              console.log(`Number of members in the room: ${roomMembers}`);
          
              // Continue with the rest of your logic based on roomMembers
              if (roomMembers >= 2) {
                if(!gameId){
                  toast.error('Something went wrong!')
                  return;
                }
                console.log(currentUser, gameId);
                setModalState('request');
                setOrientation('white');
                const newGame = new Chess()
                setGame(()=>newGame)
                console.log("Sending" ,newGame.fen())
                socket.emit('request', true, roomId, gameId,newGame.fen());
              } else {
                toast.error('User not online');
              }
            } catch (error) {
              toast.error('Error handling game:', error);
            }
          }
        }

        const returnToChat = ()=>{
          setGameState(false)
          setGame(new Chess())
          setModalState(null)
        }

        socket?.on('aborted',(modalState)=>{
          setModalState(modalState)
          if(orientation==='white')setResult('Black resigned! White is victorious.')
          else setResult('White resigned! Black is victorious.')
          //setGame(new Chess())
        })


  return (
      <div className='h-[calc(100vh-90px)] flex p-[60px] items-center gap-12'>
        <div className='flex w-[900px] h-[900px]'>
          <Chessboard position={game.fen()} boardOrientation={orientation} onPieceDrop={modalState==='request'||modalState==='end'?()=>{}:onDrop} />
        </div>
      <div className='flex flex-col bg-zinc-900 h-[500px] w-[600px] text-white'>
          {modalState==='request' && (
            <div className='text-white text-3xl font-semibold flex items-center justify-center gap-4 flex-col h-full'>
              Waiting for user to accept
              <Spinner/>
            </div>
          )}

          {(modalState==='game' || modalState==='end') && (<><div className='text-2xl h-[10%] flex items-center opacity-80 bg-zinc-800'>
          <div className='ml-4 '>{user}</div>
          </div>
          <div className='flex-col flex items-center h-[80%]'>
            <div className='h-[33%] flex items-center justify-center w-full text-lg gap-2'>
              <div><CgInfo/></div>
              <div>{modalState==='end'?result:`You play ${orientation} pieces`}</div></div>
            <div onClick={()=>{handleClick(modalState)}} className='h-[33%] flex items-center justify-center w-full hover:bg-zinc-800 text-2xl cursor-pointer'>{modalState==='end'?'Rematch':(<CiFlag1/>)}</div>
            <div onClick={()=>{returnToChat()}}className='h-[33%] flex items-center justify-center w-full text-2xl hover:bg-zinc-800 cursor-pointer'>{modalState==='end'?'Back to chat':'1/2'}</div>
          </div>
          <div className='text-2xl h-[10%] flex items-center opacity-80 bg-zinc-800'>
            <div className='ml-4'>{currentUser}</div>
          </div>
          </>)}
      </div>
    </div>
  );
}
