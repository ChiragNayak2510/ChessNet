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
      heading : 'The King',
      media : '/king.png',
      body : "In chess, the king is the most important piece on the board, and the primary objective of the game is to checkmate the opponent's king. The king has several unique characteristics and rules associated with its movement and protection." ,
      isBoardImage : true
    }
    ,
    {
      subheading : "Movement",
      body : "The king can move exactly one square in any direction: horizontally, vertically, or diagonally. It cannot move to a square that is under direct threat from an opponent's piece."
    }
    ,{
      subheading : "Castling",
      body : "The king has a special move called castling, which can be performed under the following conditions: <ul><li>Neither the king nor the rook involved in castling has moved before.</li><li>There are no pieces between the king and the rook.</li><li>The king is not in check.</li><li>The squares the king moves across and the square it ends up on are not under attack.</li></ul><p>In castling, the king moves two squares towards the rook, and the rook moves to the square next to the king on the opposite side. Castling can occur on the king's side (short castling) or the queen's side (long castling).</p>"
    }
    ,
    {
      subheading : "Protecting the king",
      body : "While the king is vulnerable due to its limited mobility, it is often crucial to shield it from direct threats. Players must carefully plan the movement of their pieces to ensure the safety of the king throughout the game.\n\n Understanding the importance of king safety, avoiding unnecessary risks, and utilizing the king's limited but critical movement are essential aspects of successful chess play."
    }
    ,
    {
    heading : 'The Queen',
    media : '/queen.png',
    body : 'In chess, the queen is one of the most powerful and versatile pieces on the board.',
    isBoardImage : true
    },
    {
      subheading : 'Movement',
      body : "The queen can move horizontally, vertically, or diagonally any number of squares. Essentially, the queen combines the abilities of the rook and the bishop."
    }
    

  ]
  
  const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
  //const currentUser = useCurrentUserStore((state)=>state.currentUser)

  useEffect(() => {
    const token = localStorage?.getItem('token');
  
    // Perform null check before slicing
    if (token) {
      const slicedToken = token.slice(1, -1);
      
      const fetchData = async () => {
        const data = await fetchCurrentUser(slicedToken);
        setCurrentUser(data);
      };
  
      fetchData();
    }
  }, []);
  
   
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
