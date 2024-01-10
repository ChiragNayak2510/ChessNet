import { useEffect} from 'react';
import fetchCurrentUser from '@/libs/fetchCurrentUser';
import useCurrentUserStore from '@/libs/store/useCurrentUserStore';
import IndexPageItems from '@/components/IndexPageItems'



export default function Home() {
  const items = [
    {
      heading : 'Getting started',
      subheading : null,
      media : '/intro.mp4',
      body : 'Welcome to the captivating world of chess, where the battlefield is a 64 squared-chessboard, and each move is a strategic dance that could lead to triumph or defeat. Imagine a realm where kings, queens, knights, bishops, rooks, and pawns come to life, each with its unique personality and purpose. Go head-to-head with other users in this century old battle. '
    }
      ,
    {
      heading : 'How to play?',
      subheading : 'Step 1: Set up the Chessboard',
      media : '/startPosition.jpg',
      body: 'Place the chessboard between the two players, making sure that each player has a white square on their right-hand side. Position the pieces on the board as follows:\n\n<ul>\n<li>Place the rooks in each corner.</li>\n<li>Place the knights next to the rooks.</li>\n<li>Place the bishops next to the knights.</li>\n<li>Place the queen on the remaining square of her color.</li>\n<li>Place the king next to the queen.</li>\n<li>Set up the pawns on the second row.</li>\n</ul>'    
    }
     ,
    {
      subheading : 'Step 2: Understand Each Chess Piece'
    },

    {
      subheading : 'The King',
      media : '/king.png',
      body : "In chess, the king is the most important piece on the board, and the primary objective of the game is to checkmate the opponent's king. The king has several unique characteristics and rules associated with its movement and protection." ,
      isBoardImage : true
    }
  ]
  
  const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
  const currentUser = useCurrentUserStore((state)=>state.currentUser)

  useEffect(() => {
    const token = localStorage?.getItem('token').slice(1,-1)
    const fetchData = async () => {
      const data = await fetchCurrentUser(token);
      setCurrentUser(data)
    };
    fetchData();
  }, [])

  if(!currentUser)
    return (
      <></>
    )
    
  return (
    <div className='overflow-y-auto h-[90vh] p-8'>
    <div className='text-white flex flex-col gap-6'>
      {items.map((item, index) => (
        <IndexPageItems
          key={index}
          heading={item.heading}
          media={item.media}
          body={item.body}
          subheading={item.subheading}
          isBoardImage = {item.isBoardImage}
        />
      ))}
    </div>
    </div>)
}
