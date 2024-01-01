import { useEffect} from 'react';
import fetchCurrentUser from '@/libs/fetchCurrentUser';
import useCurrentUserStore from '@/libs/useCurrentUserStore';

export default function Home() {

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
    <div className='text-white flex justify-center items-center'>
    </div>
  );
}
