import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email,password });
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
      navigate("/");

    } catch {
      toast.error("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          CRM Login
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="relative">
          <input
            type={show ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button
            type="button"
            onClick={()=>setShow(!show)}
            className="absolute right-2 top-2"
          >
            {show ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
        </div>

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p
          onClick={()=>navigate("/register")}
          className="text-center text-sm cursor-pointer text-blue-600"
        >
          Create account
        </p>

      </form>
    </div>
  );
}
