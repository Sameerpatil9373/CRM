import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCustomers = () => API.get("/customers");
export const addCustomer = (data) => API.post("/customers", data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

export const getPayments = () => API.get("/payments");
export const addPayment = (data) => API.post("/payments", data);
export const deletePayment = (id) => API.delete(`/payments/${id}`);

export const getReminders = () => API.get("/reminders");
export const addReminder = (data) => API.post("/reminders", data);
export const deleteReminder = (id) => API.delete(`/reminders/${id}`);

export const getStaff = () => API.get("/staff");
export const addStaff = (data) => API.post("/staff", data);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);

export const getActivities = () => API.get("/activities");
export const addActivity = (data) => API.post("/activities", data);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
