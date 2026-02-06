import { useEffect, useState } from "react";
import { getReminders, addReminder, deleteReminder } from "../services/api";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const fetchReminders = async () => {
    const res = await getReminders();
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleAdd = async () => {
    if (!customerName || !message) return;

    await addReminder({
      customerName,
      message,
      date,
      status: "Pending",
    });

    setCustomerName("");
    setMessage("");
    setDate("");
    fetchReminders();
  };

  const handleDelete = async (id) => {
    await deleteReminder(id);
    fetchReminders();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reminders</h1>

      {/* Add Reminder */}
      <div className="bg-white p-4 rounded shadow space-x-2">
        <input
          className="border p-2 rounded"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add Reminder
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Customer</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((r) => (
              <tr key={r._id} className="border-b">
                <td>{r.customerName}</td>
                <td>{r.message}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminders;
