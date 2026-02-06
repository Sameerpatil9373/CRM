import { motion } from "framer-motion";
import { DollarSign, Users, CreditCard, Bell } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from "recharts";
import React from "react";

const stats = [
  { title: "Total Revenue", value: "₹23,900", icon: DollarSign },
  { title: "Total Customers", value: "6", icon: Users },
  { title: "Pending Payments", value: "2", icon: CreditCard },
  { title: "Active Reminders", value: "3", icon: Bell },
];

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

const payments = [
  { name: "John Smith", amount: "₹500", status: "paid" },
  { name: "Sarah Johnson", amount: "₹750", status: "pending" },
  { name: "Emily Davis", amount: "₹1200", status: "paid" },
];

const reminders = [
  { name: "Sarah Johnson", text: "Follow up on contract renewal", time: "Jan 22, 10:00 AM" },
  { name: "Mike Wilson", text: "Payment reminder overdue", time: "Jan 20, 2:00 PM" },
  { name: "Emily Davis", text: "Quarterly review meeting", time: "Jan 25, 3:00 PM" },
];

const COLORS = ["#3b82f6", "#22c55e", "#f97316"];

export default function Dashboard() {
  return (
    <motion.div
      className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl">
              <item.icon className="text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[10,10,0,0]}>
                <LabelList dataKey="revenue" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Customers by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Payments</h2>
          {payments.map((p, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.status}</p>
              </div>
              <p className="font-semibold">{p.amount}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Upcoming Reminders</h2>
          {reminders.map((r, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{r.text}</p>
              <p className="text-xs text-gray-400">{r.time}</p>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
