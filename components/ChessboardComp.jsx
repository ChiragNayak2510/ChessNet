import { Chessboard } from 'react-chessboard';

export default function ChessboardComp({game,onDrop}) {

  return (
    <div className='h-[calc(100vh-90px)] flex items-center justify-center'>
    <div className='flex w-[900px] h-[900px]'>
      <Chessboard position={game.fen()} onPieceDrop={onDrop}/>
    </div>
    </div>
  );
}
