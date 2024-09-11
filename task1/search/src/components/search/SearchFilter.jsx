import { useState } from "react";
import cricketersArray from "../../data/data";

const SearchFilter = () => {
  // State to hold the search query
  const [query, setQuery] = useState("");

  // Filter cricketers based on the query
  const filteredcricketers = cricketersArray.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Search Cricketers
        </h1>

        {/* Search Input */}
        <input
          type="text"
          name="search"
          placeholder="Search by cricketer's name..."
          className="text-xl w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all sticky top-0 bg-white z-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* List of Filtered cricketers */}
        <ul className="space-y-4 max-h-80 overflow-y-scroll">
          {filteredcricketers.length > 0 ? (
            filteredcricketers.map((student, index) => (
              <li
                key={index}
                className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-indigo-400"
              >
                <h2 className="text-lg font-semibold text-indigo-700">
                  {student.name}
                </h2>
                <p className="text-sm text-gray-600">{student.address}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-500 text-center">No cricketer's found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchFilter;
