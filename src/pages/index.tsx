import { Inter } from 'next/font/google';
import withAuth from '@/utils/withAuth';
import { useAuth } from '@/components/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  const { logout } = useAuth();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button onClick={() => logout()}>Logout</button>
      <h1>This the HOME PAGE</h1>
    </main>
  );
}

export default withAuth(Home);
