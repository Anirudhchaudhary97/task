import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white p-6">
      {/* Header Section */}
      <h1 className="text-5xl font-bold mb-4">Welcome to Next.js Protected Routes</h1>
      <p className="text-xl mb-6 text-center max-w-xl">
        This is a demonstration of protected routes in Next.js. Only authenticated users can access
        the dashboard. Click the button below to log in and experience how route protection works.
      </p>

     

      {/* Login Button */}
      <button
        
        className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
      >
      <Link href={"/login"}> Login to Access Dashboard</Link> 
      </button>
    
    </div>
  );
}
