import {create} from 'zustand';

const gameStateStore = (set)=>({
    gameState : null,
    setGameState : (gameState)=>{set({gameState})}
})

const usegameStateStore = create(gameStateStore);

export default usegameStateStore;