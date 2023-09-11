"use client";

import React, { useState, FormEvent } from "react";

// interface Props {
//   onSearch: (term1: string, term2: string) => void;
// }

const SearchBar: React.FC = () => {
  const [term1, setTerm1] = useState<string>("");
  const [term2, setTerm2] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  //     onSearch(term1, term2);
  //   };

  return (
    <form onSubmit={handleSubmit} className="flex justify-start space-x-2 ">
      <label className="sr-only" htmlFor="term1">
        Subject
      </label>
      <input
        type="text"
        id="term1"
        value={term1}
        onChange={(e) => setTerm1(e.target.value)}
        placeholder="Subject"
        className="p-1 border rounded-sm  text-slate-900"
        aria-label="First Search Input"
      />

      <label className="sr-only" htmlFor="term2">
        Chamber
      </label>
      <input
        type="text"
        id="term2"
        value={term2}
        onChange={(e) => setTerm2(e.target.value)}
        placeholder="Chamber"
        className="p-1 border rounded-sm text-slate-900"
        aria-label="Second Search Input"
      />
      <button
        type="submit"
        className="p-1 px-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
