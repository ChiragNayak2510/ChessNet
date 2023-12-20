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
    <div className='flex'>
      <div className='flex text-white w-full justify-center'>
        <div className='flex w-3/4 justify-center items-center'>
          <div>
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
            <Button label='Register' onClick={register} visible={true}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
