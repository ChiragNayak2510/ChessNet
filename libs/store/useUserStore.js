import {create} from 'zustand';

const userStore = (set)=>({
    user : '',
    setUser : (user)=>{set({user})}
})

const useUserStore = create(userStore);

export default useUserStore;