import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults(null);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/search?q=${value}`);
    const data = await res.json();
    setResults(data);
  };

  // Navigate on click
  const goTo = (path) => {
    setResults(null);
    setQuery("");
    navigate(path);
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="relative flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">

      <h2 className="font-semibold text-lg">CRM System</h2>

      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative w-72">
          <input
            value={query}
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border p-2 rounded dark:bg-gray-700"
          />

          {results && (
            <div className="absolute z-50 bg-white dark:bg-gray-800 border mt-1 w-full rounded shadow max-h-80 overflow-auto">

              {/* Customers */}
              {results.customers?.length > 0 && (
                <div className="p-2">
                  <p className="font-bold text-sm mb-1">Customers</p>

                  {results.customers.map(c=>(
                    <p
                      key={c._id}
                      onClick={()=>goTo("/customers")}
                      className="text-sm py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2"
                    >
                      👤 {c.name}
                    </p>
                  ))}
                </div>
              )}

              {/* Deals */}
              {results.deals?.length > 0 && (
                <div className="p-2 border-t">
                  <p className="font-bold text-sm mb-1">Deals</p>

                  {results.deals.map(d=>(
                    <p
                      key={d._id}
                      onClick={()=>goTo("/pipeline")}
                      className="text-sm py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2"
                    >
                      💼 {d.title}
                    </p>
                  ))}
                </div>
              )}

              {/* Payments */}
              {results.payments?.length > 0 && (
                <div className="p-2 border-t">
                  <p className="font-bold text-sm mb-1">Payments</p>

                  {results.payments.map(p=>(
                    <p
                      key={p._id}
                      onClick={()=>goTo("/payments")}
                      className="text-sm py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2"
                    >
                      💰 {p.customerName}
                    </p>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* DARK MODE */}
        <button
          onClick={toggleDark}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {dark ? <Sun size={18}/> : <Moon size={18}/>}
        </button>

      </div>
    </div>
  );
}
