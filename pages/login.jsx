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
      try{
        const {data} = await axios.post('/api/login',{
          username,
          password
        })

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
        <div className='relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-1/2 p-[2rem] py-[4rem] bg-gray-900 rounded-lg flex flex-col justify-center items-center gap-2'>
        <div className='text-white font-bold text-3xl mb-2'>
          Welcome Back
        </div>
        <Input onChange={(e)=>{setUsername(e.target.value)}} placeholder={"Enter username"}></Input>
        <Input onChange={(e)=>{setPassword(e.target.value)}} placeholder={"Enter password"}></Input>
        <div className='w-full p-[2rem] text-white'>
        <Button label="Login" onClick={login} visible={true}></Button>
        </div>
        <div className='text-white cursor-pointer mt-3' onClick={()=>{router.push('/register')}}>
            Don't have an account? Register
        </div>
        </div>
  )
}