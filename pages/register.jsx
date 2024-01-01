import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const register = async () => {
    try {
      const {data} = await axios.post('/api/register', {
        name,
        username,
        email,
        password,
      });
      toast.success('User registered successfully');
      localStorage.setItem('token', JSON.stringify(data));
      router.push('/');
    } catch (err) {
      console.log('Registration failed');
    }
  };

  return (
    <div className='relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-1/2 h-1/2 bg-gray-900 rounded-lg flex flex-col justify-center items-center gap-2'>
        <div className='text-white font-bold text-3xl mb-2'>
          New here? Sign up now!
        </div>
        <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={'Enter name'}
            ></Input>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder={'Enter username'}
            ></Input>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={'Enter email'}
            ></Input>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={'Enter password'}
            ></Input>
        <div className='w-[660px] text-white'>
        <Button label='Register' onClick={register} visible={true}></Button>
        </div>
        <div className='text-white cursor-pointer mt-3' onClick={()=>{router.push('/register')}}>
           Already a member? Sign in
        </div>
  </div>
  );
}
