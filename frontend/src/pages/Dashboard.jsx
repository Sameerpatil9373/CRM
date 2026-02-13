import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [kpis, setKpis] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {

    // KPI DATA
    fetch(`${API_BASE_URL}/dashboard/kpis`)
      .then(res => res.json())
      .then(data => setKpis(data));

    // DEAL STATS
    fetch(`${API_BASE_URL}/dashboard/deal-stats`)
      .then(res => res.json())
      .then(data => setStats(data));

  }, []);

  if (!kpis || !stats) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const chartData = Object.entries(stats.stageMap).map(
    ([stage, value]) => ({ stage, value })
  );

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        CRM Analytics Dashboard
      </h1>

      {/* KPI WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm opacity-70">Customers</p>
          <p className="text-2xl font-bold text-blue-600">
            {kpis.totalCustomers}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm opacity-70">Deals</p>
          <p className="text-2xl font-bold text-purple-600">
            {kpis.totalDeals}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm opacity-70">Pipeline Value</p>
          <p className="text-2xl font-bold text-orange-600">
            ₹ {kpis.pipelineValue}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm opacity-70">Won Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            ₹ {kpis.wonRevenue}
          </p>
        </div>

      </div>

      {/* EXISTING ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3>Total Pipeline</h3>
          <p className="text-xl font-bold text-blue-600">
            ₹ {stats.total}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3>Won Revenue</h3>
          <p className="text-xl font-bold text-green-600">
            ₹ {stats.won}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3>Lost Revenue</h3>
          <p className="text-xl font-bold text-red-600">
            ₹ {stats.lost}
          </p>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
