import React, { useState } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults(null);
      return;
    }

    const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
    setResults(res.data);
  };

  return (
    <div className="relative w-72">

      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search customers/payments..."
        className="w-full p-2 border rounded dark:bg-gray-800"
      />

      {results && (
        <div className="absolute bg-white dark:bg-gray-800 shadow w-full mt-1 p-2 rounded z-50">

          {results.customers.map(c => (
            <div key={c._id} className="p-1 border-b">
              👤 {c.name}
            </div>
          ))}

          {results.payments.map(p => (
            <div key={p._id} className="p-1 border-b">
              💰 {p.reference}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
