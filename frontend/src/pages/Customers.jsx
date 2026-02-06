import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);

  const fetchCustomers = async () => {
    const res = await fetch(
      `http://localhost:5000/api/customers?search=${search}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setCustomers(data.customers);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>

      {/* Search */}
      <input
        placeholder="Search customer..."
        className="border p-2 w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded mt-4">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} className="border-b text-center">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button disabled={page===1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page===totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
