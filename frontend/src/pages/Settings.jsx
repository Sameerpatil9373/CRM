const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-gray-600">First Name</label>
          <input className="border rounded-lg p-2 w-full" placeholder="Admin" />
        </div>

        <div>
          <label className="block text-gray-600">Last Name</label>
          <input className="border rounded-lg p-2 w-full" placeholder="User" />
        </div>

        <div>
          <label className="block text-gray-600">Email</label>
          <input className="border rounded-lg p-2 w-full" placeholder="admin@crm.com" />
        </div>

        <div>
          <label className="block text-gray-600">Phone</label>
          <input className="border rounded-lg p-2 w-full" placeholder="+91 9876543210" />
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
