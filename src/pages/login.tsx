import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
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

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    };

    fetch('https://demo.cardid.app/api/login/', requestOptions)
      .then((res) => {
        if (res.ok) {
          // Login successful
          return res.json();
        } else {
          // Login failed
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        // Access the response data
        console.log('Response:', data);
        localStorage.setItem('user', data.result.email);
        localStorage.setItem('token', data.result.token);

        // when successfully logged in redirect to home page
        router.push('/');
      })
      .catch((error) => {
        // An error occurred during the request
        console.error('Error:', error);
        // Handle the error appropriately
      });
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
