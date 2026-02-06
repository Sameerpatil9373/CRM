import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, Bell, UserCheck, Activity, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen shadow-md p-4">
      <h1 className="text-xl font-bold mb-8">CRM Pro</h1>

      <nav className="space-y-3">

        <NavLink to="/" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <LayoutDashboard size={18}/> Dashboard
        </NavLink>

        <NavLink to="/customers" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Users size={18}/> Customers
        </NavLink>

        <NavLink to="/payments" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <CreditCard size={18}/> Payments
        </NavLink>

        <NavLink to="/reminders" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell size={18}/> Reminders
        </NavLink>

        <NavLink to="/staff" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <UserCheck size={18}/> Staff
        </NavLink>

        <NavLink to="/activity" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Activity size={18}/> Activity Logs
        </NavLink>

        <NavLink to="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Settings size={18}/> Settings
        </NavLink>

      </nav>
    </div>
  );
}
