import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name,email,password });
      toast.success("Account created");
      navigate("/login");

    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Register Account
        </h2>

        <input
          placeholder="Name"
          value={name}
          onChange={e=>setName(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Register
        </button>

        <p
          onClick={()=>navigate("/login")}
          className="text-center text-sm cursor-pointer text-blue-600"
        >
          Back to login
        </p>

      </form>
    </div>
  );
}
