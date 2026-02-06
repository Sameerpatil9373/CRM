import React, { useEffect, useState } from "react";
import { Sun, Moon, Bell, User } from "lucide-react";

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">CRM Dashboard</h1>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 dark:text-gray-300" />

        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700 dark:text-gray-200" />}
        </button>

        <div className="flex items-center gap-2">
          <User className="text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-white">Admin</span>
        </div>
      </div>
    </div>
  );
}
