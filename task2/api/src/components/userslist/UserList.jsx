import React from "react";
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch users from the API
  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-700"></div>
        <span className="ml-4 text-lg text-green-700 font-semibold">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE5CF] flex justify-center items-center p-8">
      <div className="w-full max-w-6xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#557C56] text-center mb-8">
          Users List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-bold text-[#557C56] mb-3">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Website:</span>{" "}
                <a
                  href={`http://${user.website}`}
                  className="text-[#FF885B] hover:underline"
                >
                  {user.website}
                </a>
              </p>
              <button className="bg-[#FF885B] text-white px-4 py-2 rounded-lg mt-2 hover:bg-[#FF5733] transition duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
