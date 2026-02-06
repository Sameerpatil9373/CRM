import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { DollarSign, Users, CreditCard, Bell } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from "recharts";

export default function Dashboard() {

  // ⭐ LIVE STATS STATE
  const [stats, setStats] = useState({
    revenue: 0,
    customers: 0,
    pending: 0,
    reminders: 0
  });

  // Fetch stats
  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.revenue}`, icon: DollarSign },
    { title: "Total Customers", value: stats.customers, icon: Users },
    { title: "Pending Payments", value: stats.pending, icon: CreditCard },
    { title: "Active Reminders", value: stats.reminders, icon: Bell },
  ];

  // Dummy chart data
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 7000 },
  ];

  const categoryData = [
    { name: "Coaching", value: 2 },
    { name: "Real Estate", value: 2 },
    { name: "Fitness", value: 2 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f97316"];

  return (
    <motion.div
      className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* ⭐ Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <item.icon className="text-blue-500" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">Revenue Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="revenue" fill="#3b82f6">
                <LabelList dataKey="revenue" position="top"/>
              </Bar>
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Customers by Category</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" label>
                {categoryData.map((e,i)=>(
                  <Cell key={i} fill={COLORS[i]}/>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>
  );
}
