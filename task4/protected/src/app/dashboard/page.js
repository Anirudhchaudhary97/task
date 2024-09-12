"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

 function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = Cookies.get('auth');
    if (!auth) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);


   // Logout function
   const handleLogout = () => {
    Cookies.remove('auth'); // Remove the authentication cookie
    router.push('/login'); // Redirect to login page
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <h1 className="text-4xl mb-4">Welcome to the Dashboard!</h1>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  </div>
  );
}

export default Dashboard









