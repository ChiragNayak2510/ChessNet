import {useState,useEffect} from 'react';
import Input from '../components/Input'
import Button from '../components/Button'
import useUserIdStore from '@/libs/chatIdStore';
import fetchCurrentUser from '@/libs/fetchCurrentUser';


export default function Chat(){
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState('')
    const userId = useUserIdStore((state)=>state.userId)
    const [currentUser,setCurrentUser] = useState();

    useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentUser();
      setCurrentUser(data)
      console.log("currentUser",currentUser)
    };
    fetchData();
  }, [])

    const handleSendMessage = ()=>{
        if(newMessage.trim()===''){
            return;
        }

        setMessages((prevMessages)=>[
            ...prevMessages,
            {text : newMessage,user : 'Me',type:'outgoing'}
        ])

        setNewMessage('')
        
    }
    return(
        <>
        <div className='mt-4 flex-col text-white'>
            <div className='ml-auto w-max space-y-4'>
            {messages.map((message,index)=>(
                <div key={index} style={{float:"right"}} className ="p-4 flex rounded-full bg-gray-700 w-fit items-end max-w-1/2 clear-both">
                    {message.text}
                </div>
            ))}
            {userId}
            </div>
        </div>
        
        <div className='flex absolute bottom-0 w-full text-white'>
            
        <Input value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} placeholder='Type a message'></Input>
            <div className='w-1/5 ml-2'>
            <Button visible={true} label='Send' onClick={handleSendMessage}></Button>
            </div>
        </div>
        </>
        
    )

}