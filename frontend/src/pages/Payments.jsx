import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${API_BASE_URL}/payments?status=${encodeURIComponent(status)}&page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await res.json();
        setPayments(data.payments || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.message || "Unable to load payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [status, page]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>

      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
      </select>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="w-full mt-2">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && payments.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="3">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="border-b text-left">
                  <td className="p-3">{p.customerName}</td>
                  <td className="p-3">₹{p.amount}</td>
                  <td className="p-3 capitalize">{p.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {loading && <p className="text-gray-500">Loading payments...</p>}

      <div className="flex items-center gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page >= totalPages || loading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
