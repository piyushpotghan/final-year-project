import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search doctors or specialists..."
        className="w-1/2 p-2 border rounded-lg  md:w-1/2 lg:w-1/3 focus:outline-none
          focus:ring-2 focus:ring-cyan-500 transition-shadow duration-200"
      />
    </div>
  );
};

export default SearchBar;