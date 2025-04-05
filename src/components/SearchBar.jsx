import React, { useState, useRef, useEffect } from "react";
export const SearchBar = () => {
  const [input, setInput] = useState("");
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col lg:w-[35vw] w-[90vw]">
        <input
          className="w-full min-h-[2.5rem] bg-white rounded-full"
          type="text"
          value={input}
          placeholder="Search for games..."
        />
      </div>
    </div>
  );

};
export default SearchBar;
