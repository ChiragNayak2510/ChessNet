import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserIdStore from '@/libs/store/useUserIdStore';
import { useRouter } from 'next/router';
import generateRoomId from '@/libs/generateRoomId'
import useCurrentUserStore from '@/libs/store/useCurrentUserStore';
import fetchCurrentUser from '@/libs/fetchCurrentUser';
import useUserStore from '@/libs/store/useUserStore';
import usegameStateStore from '@/libs/store/useGameStateStore';

export default function Right() {
  const [data, setData] = useState([]);
  const setUserId = useUserIdStore((state)=>state.setUserId)
  const currentUser = useCurrentUserStore((state)=>state.currentUser)
  const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
  const setUser = useUserStore((state) => state.setUser);
  const gameState = usegameStateStore((state)=>state.gameState)
  const router = useRouter();

  const fetchUser = async (token) => {
    const userData = await fetchCurrentUser(token);
    setCurrentUser(userData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token').slice(1, -1);
  
      fetchUser(token);
    }
    fetchData();
  }, []);


  const openChat = (userId,username)=>{

    if(!currentUser || gameState===true){
      return
    }
    if (localStorage?.getItem('token') !== null) {
      const token = localStorage.getItem('token').slice(1, -1);
      fetchUser(token); 
    }
    setUserId(userId)
    setUser(username)
    const roomId = generateRoomId(currentUser._id,userId)
    router.push(`/chat/${roomId}`)
  }

  return (
    <div className="ml-auto border-l border-gray-600 h-screen w-1/4 text-white flex flex-col">
      <div className='text-gray-400 text-xl font-bold flex items-center pt-4 pl-4'>
        Suggested for you
      </div>
      <div className="flex flex-col gap-6 pl-4 pt-4">
        {data.map((user) => (
          !currentUser || user._id !== currentUser._id ? (
            <div className="flex flex-row gap-2" key={user._id}>
              {/* <Avatar userId={user.id} /> */}
              <div className="flex flex-col">
                <p className="text-white font-semibold text-md cursor-pointer text-lg" onClick={() => {openChat(user._id,user.name)}}>
                  {user.name}
                </p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
