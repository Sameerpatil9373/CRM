const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-xl font-bold text-center">CRM Login</h1>

        <input className="border p-2 w-full rounded" placeholder="Email" />
        <input type="password" className="border p-2 w-full rounded" placeholder="Password" />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
