import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialForm = {
  name: "",
  email: "",
  category: "Coaching",
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initialForm);

  const fetchCustomers = async () => {
    const res = await fetch(`${API_BASE_URL}/customers`);
    const data = await res.json();
    setCustomers(data.customers || []);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(initialForm);
    fetchCustomers();
  };

  // ⭐ EXPORT FUNCTION
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "customers.xlsx");
  };
// ⭐ EXPORT PDF
const exportPDF = () => {
  const doc = new jsPDF();

  const tableColumn = ["Name", "Email", "Category"];
  const tableRows = customers.map(c => [
    c.name,
    c.email,
    c.category
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("customers.pdf");
};

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">Customers</h1>

      {/* ADD */}
      <form onSubmit={handleAddCustomer} className="flex gap-2 flex-wrap">

        <input
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />

        <input
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />

        <select
          value={form.category}
          onChange={(e)=>setForm({...form,category:e.target.value})}
          className="border p-2 rounded"
        >
          <option>Coaching</option>
          <option>Real Estate</option>
          <option>Fitness</option>
        </select>

        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>

        {/* ⭐ EXPORT BUTTON */}
        <button
          type="button"
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 rounded"
        >
          Export Excel
        </button>
        <button
  type="button"
  onClick={exportPDF}
  className="bg-red-600 text-white px-4 rounded"
>
  Export PDF
</button>


      </form>

      {/* TABLE */}
      <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c=>(
            <tr key={c._id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
