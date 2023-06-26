import { useState, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  currentUser: string | null;
  login: (payload: Payload) => Promise<void | undefined>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ResponseData {
  result: {
    email: string;
    token: string;
  };
}

type Payload = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  async function login(payload: Payload): Promise<void | undefined> {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(
        'https://demo.cardid.app/api/login/',
        requestOptions
      );
      if (response.ok) {
        // Login successful
        const data: ResponseData = await response.json();
        localStorage.setItem('user', data.result.email);
        localStorage.setItem('token', data.result.token);

        //
        setCurrentUser(data.result.email);

        // when successfully logged in redirect to home page
        router.push('/');
      } else {
        // Login failed
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
