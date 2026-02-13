import { useEffect, useState } from "react";
import {
  getDeals,
  addDeal,
  updateDealStage,
  updateDeal,
  deleteDeal,
  getCustomers
} from "../services/api";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

const stages = ["Lead", "Contacted", "Proposal", "Won", "Lost"];

export default function Pipeline() {

  const [deals, setDeals] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState("");

  // ⭐ FILTER STATES
  const [stageFilter, setStageFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");

  const fetchData = async () => {
    const d = await getDeals();
    const c = await getCustomers();
    setDeals(d.data);
    setCustomers(c.data.customers || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const createDeal = async () => {
    if (!title.trim()) {
      toast.error("Enter deal title");
      return;
    }

    await addDeal({
      title,
      value: Number(value) || 0,
      customer: selectedCustomer || null
    });

    toast.success("Deal created");
    setTitle("");
    setValue("");
    setSelectedCustomer("");
    fetchData();
  };

  // DRAG
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    await updateDealStage(
      result.draggableId,
      result.destination.droppableId
    );

    toast.success("Stage updated");
    fetchData();
  };

  // EDIT
  const startEdit = (deal) => {
    setEditingId(deal._id);
    setEditTitle(deal.title);
    setEditValue(deal.value);
  };

  const saveEdit = async (id) => {
    await updateDeal(id, {
      title: editTitle,
      value: editValue
    });

    toast.success("Deal updated");
    setEditingId(null);
    fetchData();
  };

  // DELETE
  const removeDeal = async (id) => {
    if (!window.confirm("Delete this deal?")) return;

    await deleteDeal(id);
    toast.success("Deal deleted");
    fetchData();
  };

  // ⭐ FILTERED DATA
  const filteredDeals = deals.filter(d =>
    (!stageFilter || d.stage === stageFilter) &&
    (!customerFilter || d.customer?._id === customerFilter)
  );

  // EXPORT EXCEL
  const exportDealsExcel = () => {
    const formatted = filteredDeals.map(d => ({
      Title: d.title,
      Customer: d.customer?.name || "",
      Stage: d.stage,
      Value: d.value
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Deals");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "deals.xlsx");

    toast.success("Excel downloaded");
  };

  // EXPORT PDF
  const exportDealsPDF = () => {
    const doc = new jsPDF();

    const rows = filteredDeals.map(d => [
      d.title,
      d.customer?.name || "",
      d.stage,
      d.value
    ]);

    autoTable(doc, {
      head: [["Title","Customer","Stage","Value"]],
      body: rows
    });

    doc.save("deals.pdf");
    toast.success("PDF downloaded");
  };

  return (
    <div className="p-6">

      {/* FILTER UI */}
      <div className="flex gap-2 mb-4 flex-wrap">

        <select
          value={stageFilter}
          onChange={(e)=>setStageFilter(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700"
        >
          <option value="">All Stages</option>
          {stages.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={customerFilter}
          onChange={(e)=>setCustomerFilter(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700"
        >
          <option value="">All Customers</option>
          {customers.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <button
          onClick={()=>{
            setStageFilter("");
            setCustomerFilter("");
          }}
          className="bg-gray-500 text-white px-3 rounded"
        >
          Clear Filters
        </button>

      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Deal Pipeline</h1>

        <div className="flex gap-2">
          <button
            onClick={exportDealsExcel}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Export Excel
          </button>

          <button
            onClick={exportDealsPDF}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* CREATE */}
      <div className="flex gap-2 mb-6 flex-wrap">

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Deal title"
          className="border p-2 rounded dark:bg-gray-700"
        />

        <input
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          type="number"
          placeholder="₹ Value"
          className="border p-2 rounded dark:bg-gray-700"
        />

        <select
          value={selectedCustomer}
          onChange={(e)=>setSelectedCustomer(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700"
        >
          <option value="">Customer</option>
          {customers.map(c=>(
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <button
          onClick={createDeal}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>

      </div>

      {/* PIPELINE */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {stages.map(stage => (
            <Droppable droppableId={stage} key={stage}>
              {(provided)=>(
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded min-h-[300px]"
                >
                  <h2 className="font-bold mb-3 text-center">{stage}</h2>

                  {filteredDeals
                    .filter(d=>d.stage===stage)
                    .map((d,index)=>(
                      <Draggable
                        key={d._id}
                        draggableId={d._id}
                        index={index}
                      >
                        {(provided)=>(
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-700 p-3 mb-2 rounded shadow"
                          >

                            {editingId === d._id ? (
                              <>
                                <input
                                  value={editTitle}
                                  onChange={(e)=>setEditTitle(e.target.value)}
                                  className="border p-1 w-full mb-1"
                                />
                                <input
                                  value={editValue}
                                  onChange={(e)=>setEditValue(e.target.value)}
                                  className="border p-1 w-full mb-1"
                                />
                                <button
                                  onClick={()=>saveEdit(d._id)}
                                  className="text-green-600 text-sm"
                                >
                                  Save
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="font-semibold">{d.title}</p>

                                {d.customer && (
                                  <p className="text-sm opacity-70">
                                    👤 {d.customer.name}
                                  </p>
                                )}

                                <p className="text-green-600 font-bold">
                                  ₹ {d.value}
                                </p>

                                <div className="flex gap-2 mt-2 text-sm">
                                  <button
                                    onClick={()=>startEdit(d)}
                                    className="text-blue-600"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    onClick={()=>removeDeal(d._id)}
                                    className="text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}

                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

    </div>
  );
}
