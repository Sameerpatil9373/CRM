import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});
API.interceptors.request.use((req)=>{
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if(token)
    req.headers.Authorization = `Bearer ${token}`;

  return req;
});

export default API;
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

export const getDeals = () => API.get("/deals");
export const addDeal = (data) => API.post("/deals", data);
export const updateDealStage = (id, stage) =>
  API.put(`/deals/${id}`, { stage });

export const getDealStats = () =>
  API.get("/dashboard/deal-stats");

export const updateDeal = (id,data)=>
  API.put(`/deals/${id}`,data);

export const deleteDeal = (id)=>
  API.delete(`/deals/${id}`);

// AUTH
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);
