import { useEffect, useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);

  const fetchPayments = async () => {
    const res = await fetch(
      `http://localhost:5000/api/payments?status=${status}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setPayments(data.payments);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchPayments();
  }, [status, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>

      {/* Filter */}
      <select
        className="border p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
      </select>

      <table className="w-full bg-white shadow rounded mt-4">
        <thead>
          <tr className="border-b">
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border-b text-center">
              <td>{p.customerName}</td>
              <td>₹{p.amount}</td>
              <td>{p.status}</td>
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
