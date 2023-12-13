import '../styles/globals.css'
import '../components/layout/Left'
import Button from '@/components/Button'
import Input from '@/components/Input'
import axios from 'axios'
import { toast} from 'react-toastify';
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const[password,setPassword]= useState('');
  const[username,setUsername] = useState('');
  const router = useRouter()

  const login = async()=>{
      console.log({password,username})
      try{
        const {data} = await axios.post('/api/login',{
          username,
          password
        })
        console.log(data)
        toast.success('Login successul')
        localStorage.setItem('token',JSON.stringify(data))
        router.push('/')
      }
      catch(err){
        toast.error('Invalid credentials')
        console.log(err)  
      }
  }
  return (
    <div className='flex'>
    <div className='flex text-white w-full justify-center'>
        <div className='flex w-3/4 justify-center items-center'>
        <div>
        <Input onChange={(e)=>{setUsername(e.target.value)}} placeholder={"Enter username"}></Input>
        <Input onChange={(e)=>{setPassword(e.target.value)}} placeholder={"Enter password"}></Input>
        <div className='w-4/5'>
        <Button label="Login" onClick={login} visible={true}></Button>
        </div>
        </div>
        </div>
    </div>
    
    </div>
  )
}