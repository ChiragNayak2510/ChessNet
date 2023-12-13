import { useEffect, useState } from 'react';
import fetchCurrentUser from '@/libs/fetchCurrentUser';

export default function Home() {

  const [currentUser,setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentUser();
      setCurrentUser(data)
    };
    fetchData();
  }, [])

  if(!currentUser)
    return (
      <></>
    )
    
  return (
    <div className='text-white flex justify-center items-center'>
      This is home page
    </div>
  );
}
