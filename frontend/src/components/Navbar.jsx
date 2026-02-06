import React, { useState, useEffect } from "react";
import { Sun, Moon, Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // Load saved mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle mode
  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between items-center">
      
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        CRM Dashboard
      </h1>
      <SearchBar />


      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 dark:text-gray-300" />

        <button
          onClick={toggleDark}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {dark ? <Sun className="text-yellow-400" /> : <Moon />}
        </button>

        <div className="flex items-center gap-2">
          <User className="text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-white">Admin</span>
        </div>
      </div>
    </div>
  );
}
