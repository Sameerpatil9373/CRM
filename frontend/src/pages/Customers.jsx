import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 5;

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${API_BASE_URL}/customers?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await res.json();
        setCustomers(data.customers || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.message || "Unable to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>

      <input
        placeholder="Search customer..."
        className="border p-2 w-full md:w-72 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="w-full mt-2">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {!loading && customers.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="3">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c._id} className="border-b text-left">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {loading && <p className="text-gray-500">Loading customers...</p>}

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
