import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserIdStore from '@/libs/chatIdStore';
import { useRouter } from 'next/router';

export default function Right() {
  const [data, setData] = useState([]);
  const setUserId = useUserIdStore((state)=>state.setUserId)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openChat = (user)=>{
    setUserId(user._id)
    router.push('/chat')
  }

  return (
    <div className="ml-auto border-l border-gray-600 h-screen w-1/4 text-white flex flex-col">
      <div className="flex flex-col gap-6 mt-4 ml-2">
        {data.map((user) => (
          <div className="flex flex-row gap-2" key={user._id}>
            {/* <Avatar userId={user.id} /> */}
            <div className="flex flex-col">
              <p className="text-white font-semibold text-md cursor-pointer" onClick={()=>{openChat(user)}}>{user.name}</p>
              <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
