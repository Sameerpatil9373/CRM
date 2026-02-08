import { useEffect, useState } from "react";
import { getDealStats } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDealStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return <p className="p-6">Loading analytics...</p>;

  const data = Object.entries(stats.stageMap).map(
    ([stage, value]) => ({ stage, value })
  );

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        CRM Analytics Dashboard
      </h1>

      {/* Cards */}
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

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
