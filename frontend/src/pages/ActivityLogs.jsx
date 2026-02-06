import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, UserPlus, Edit, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activity`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  const getIcon = (message) => {
    if (message.includes("Added")) return <UserPlus className="text-green-500" />;
    if (message.includes("Updated")) return <Edit className="text-blue-500" />;
    if (message.includes("Deleted")) return <Trash2 className="text-red-500" />;
    return <Activity className="text-gray-500" />;
  };

  return (
    <motion.div
      className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>

      <div className="space-y-4">
        {logs.map((log) => (
          <motion.div
            key={log._id}
            className="flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
              {getIcon(log.message)}
            </div>

            {/* Content */}
            <div>
              <p className="font-medium">{log.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(log.date).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {logs.length === 0 && (
        <p className="text-gray-500 mt-6">No activity logs yet.</p>
      )}
    </motion.div>
  );
}
