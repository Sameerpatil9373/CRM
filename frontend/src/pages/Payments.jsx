import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const defaultForm = {
  customerName: "",
  category: "",
  amount: "",
  status: "pending",
};

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const limit = 5;

  const fetchPayments = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams({
        status,
        category: categoryFilter,
        page: String(page),
        limit: String(limit),
      });

      const res = await fetch(`${API_BASE_URL}/payments?${query.toString()}`);

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

  useEffect(() => {
    fetchPayments();
  }, [status, categoryFilter, page]);

  useEffect(() => {
    setPage(1);
  }, [status, categoryFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      customerName: form.customerName.trim(),
      category: form.category.trim() || "Uncategorized",
      amount: Number(form.amount),
      status: form.status,
    };

    try {
      const url = editingId ? `${API_BASE_URL}/payments/${editingId}` : `${API_BASE_URL}/payments`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${editingId ? "update" : "add"} payment`);
      }

      resetForm();
      fetchPayments();
    } catch (err) {
      setError(err.message || "Unable to save payment.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment._id);
    setForm({
      customerName: payment.customerName || "",
      category: payment.category || "",
      amount: payment.amount || "",
      status: payment.status || "pending",
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this payment?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE_URL}/payments/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete payment");
      }
      fetchPayments();
    } catch (err) {
      setError(err.message || "Unable to delete payment.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white dark:bg-gray-800 p-3 rounded shadow">
        <input
          className="border p-2 rounded"
          placeholder="Customer name"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Category (ex: Real Estate)"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          placeholder="Amount"
          type="number"
          min="0"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select className="border p-2 rounded" name="status" value={form.status} onChange={handleChange}>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded bg-blue-600 text-white" disabled={saving} type="submit">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button className="px-3 py-2 rounded border" type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex gap-2 flex-wrap">
        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Filter category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="w-full mt-2">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && payments.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="5">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="border-b text-left">
                  <td className="p-3">{p.customerName}</td>
                  <td className="p-3">{p.category || "Uncategorized"}</td>
                  <td className="p-3">₹{p.amount}</td>
                  <td className="p-3 capitalize">{p.status}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </td>
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
