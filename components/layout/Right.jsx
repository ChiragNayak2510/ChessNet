import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserIdStore from '@/libs/useUserIdStore';
import { useRouter } from 'next/router';
import generateRoomId from '@/libs/generateRoomId'
import useCurrentUserStore from '@/libs/useCurrentUserStore';
import fetchCurrentUser from '@/libs/fetchCurrentUser';

export default function Right() {
  const [data, setData] = useState([]);
  const setUserId = useUserIdStore((state)=>state.setUserId)
  const currentUser = useCurrentUserStore((state)=>state.currentUser)
  const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
  const userId = useUserIdStore((state)=>state.userId)
  const router = useRouter();

  const fetchUser = async (token) => {
    const userData = await fetchCurrentUser(token);
    setCurrentUser(userData);
    console.log(userData)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
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


  const openChat = (userId)=>{
    if (localStorage?.getItem('token') !== null) {
      const token = localStorage.getItem('token').slice(1, -1);
      fetchUser(token);
    }
    setUserId(userId)
    console.log(data,currentUser._id, userId,"here ")
    const roomId = generateRoomId(currentUser._id,userId)
    router.push(`/chat/${roomId}`)
  }

  return (
    <div className="ml-auto border-l border-gray-600 h-screen w-1/4 text-white flex flex-col">
      <div className="flex flex-col gap-6 mt-4 ml-2">
        {data.map((user) => (
          <div className="flex flex-row gap-2" key={user._id}>
            {/* <Avatar userId={user.id} /> */}
            <div className="flex flex-col">
              <p className="text-white font-semibold text-md cursor-pointer" onClick={()=>{openChat(user._id)}}>{user.name}</p>
              <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
