import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "Staff" });
  const [editingId, setEditingId] = useState(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 5;

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/staff?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Failed to fetch staff");
      }

      const data = await res.json();
      setStaff(data.staff || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message || "Unable to load staff.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = editingId ? `${API_BASE_URL}/staff/${editingId}` : `${API_BASE_URL}/staff`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(editingId ? "Failed to update staff" : "Failed to add staff");
      }

      setForm({ name: "", email: "", role: "Staff" });
      setEditingId(null);
      fetchStaff();
    } catch (err) {
      setError(err.message || "Unable to save staff.");
    }
  };

  const editStaff = (member) => {
    setForm({ name: member.name, email: member.email, role: member.role });
    setEditingId(member._id);
  };

  const deleteStaff = async (id) => {
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/staff/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete staff");
      }

      fetchStaff();
    } catch (err) {
      setError(err.message || "Unable to delete staff.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Staff Management</h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
        />
        <select
          className="border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-gray-500">Loading staff...</p>}

      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && staff.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="4">
                  No staff records found.
                </td>
              </tr>
            ) : (
              staff.map((member) => (
                <tr key={member._id} className="border-b text-left">
                  <td className="p-3">{member.name}</td>
                  <td className="p-3">{member.email}</td>
                  <td className="p-3">{member.role}</td>
                  <td className="p-3 space-x-3">
                    <button onClick={() => editStaff(member)} className="text-blue-500">
                      Edit
                    </button>
                    <button onClick={() => deleteStaff(member._id)} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 mt-4">
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
