import {create} from 'zustand';

const userIdStore = (set)=>({
    userId : '',
    setUserId : (userId)=>{set({userId})}
})

const useUserIdStore = create(userIdStore);

export default useUserIdStore;
