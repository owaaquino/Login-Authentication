import { useState, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  currentUser: string | null;
  login: (payload: Payload) => Promise<void | undefined>;
  logout: () => void;
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
  logout: () => {},
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

      const response = await fetch('[ YOUR LOGIN API ]', requestOptions);
      if (response.ok) {
        // Login successful
        const data: ResponseData = await response.json();
        localStorage.setItem('user', data.user);
        localStorage.setItem('token', data.token);

        //
        setCurrentUser(data.user);

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

  function logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // TODO: for token expiration if implemented
    // localStorage.removeItem('setupTime');

    // Clear the user state
    setCurrentUser(null);

    // Navigate to the login page
    router.push('/login');
  }

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
