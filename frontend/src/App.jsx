import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RoleProvider } from "./context/RoleContext";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Reminders from "./pages/Reminders";
import Staff from "./pages/Staff";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import Pipeline from "./pages/Pipeline";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <RoleProvider>
      <Router>
        <div className="flex">
          <Sidebar />

          <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <Navbar />
             <Toaster position="top-right" />
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/activity" element={<ActivityLogs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>

          </div>
        </div>
      </Router>
    </RoleProvider>
  );
}

export default App;
