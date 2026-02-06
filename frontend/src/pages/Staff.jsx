import { useEffect, useState } from "react";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", role:"Staff" });
  const [editingId, setEditingId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);

  const fetchStaff = async () => {
    const res = await fetch(`http://localhost:5000/api/staff?page=${page}&limit=${limit}`);
    const data = await res.json();
    setStaff(data.staff);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchStaff();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:5000/api/staff/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ name:"", email:"", role:"Staff" });
    setEditingId(null);
    fetchStaff();
  };

  const editStaff = (s) => {
    setForm(s);
    setEditingId(s._id);
  };

  const deleteStaff = async (id) => {
    await fetch(`http://localhost:5000/api/staff/${id}`, { method: "DELETE" });
    fetchStaff();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">Staff Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          className="border p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />
        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />
        <select
          className="border p-2"
          value={form.role}
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>

        <button className="bg-blue-500 text-white px-4">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s._id} className="border-b text-center">
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.role}</td>
              <td className="space-x-2">
                <button onClick={()=>editStaff(s)} className="text-blue-500">Edit</button>
                <button onClick={()=>deleteStaff(s._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-3 mt-4">
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page===totalPages} onClick={()=>setPage(page+1)}>Next</button>
      </div>

    </div>
  );
}
