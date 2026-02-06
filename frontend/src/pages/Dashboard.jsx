import React, { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, Users, CreditCard, Bell } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from "recharts";
import { API_BASE_URL } from "../config/api";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#14b8a6", "#f43f5e"];

export default function Dashboard() {
  const [stats, setStats] = useState({ revenue: 0, customers: 0, pending: 0, overdue: 0, reminders: 0 });
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/dashboard/overview`)
      .then((res) => {
        setStats(res.data.stats || { revenue: 0, customers: 0, pending: 0, overdue: 0, reminders: 0 });
        setRevenueData(res.data.revenueChart || []);
        setCategoryData(res.data.categoryChart || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.revenue}`, icon: DollarSign },
    { title: "Total Customers", value: stats.customers, icon: Users },
    { title: "Pending Payments", value: stats.pending, icon: CreditCard },
    { title: "Overdue Payments", value: stats.overdue, icon: CreditCard },
    { title: "Active Reminders", value: stats.reminders, icon: Bell },
  ];

  return (
    <div
      className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
    >
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6">
                <LabelList dataKey="revenue" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Customers by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" label>
                {categoryData.map((entry, i) => (
                  <Cell key={`${entry.name}-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
