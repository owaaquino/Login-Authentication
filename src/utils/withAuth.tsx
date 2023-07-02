import { useState, useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/context/AuthContext';

interface AuthProps {
  isAuthenticated: boolean;
}

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P & AuthProps) => {
    const router = useRouter();
    const { currentUser: initialCurrentUser } = useAuth();
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);

    useEffect(() => {
      if (typeof window !== 'undefined' && !initialCurrentUser) {
        // Fetch the authentication state on the client-side
        // This can be an API request or reading from local storage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setCurrentUser(storedUser);
        } else {
          router.replace('/login');
        }
      }
    }, [initialCurrentUser, router]);

    if (!currentUser) {
      return null;
    }
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
