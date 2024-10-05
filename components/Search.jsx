'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    
    if (query) {
      params.set('query', query); // Filter based on the query
    } else {
      params.delete('query');
    }
    
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto mt-6">
      <div className="relative w-full">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          id="search"
          className="block w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ease-in-out duration-300 shadow-lg"
          placeholder="Search Blogs..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
