import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/components/context/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const [payload, setPayload] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, payload: LoginForm) => {
    e.preventDefault();
    login(payload);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, payload)}>
        <p className='mb-2'>
          <label htmlFor='email'>Username</label>
          <input
            name='email'
            id='email'
            type='email'
            onChange={handleChange}
            className='block text-black'
          />
        </p>
        <p className='mb-2'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            id='password'
            type='password'
            onChange={handleChange}
            className='block text-black'
          />
        </p>
        <button type='submit' className='bg-white text-black px-2 mt-5'>
          Login
        </button>
      </form>
    </>
  );
}
