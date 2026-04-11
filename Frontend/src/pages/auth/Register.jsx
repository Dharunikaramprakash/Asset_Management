import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/user/register", form);
    navigate("/login");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5"
    >
      <h2 className="text-3xl font-bold text-center text-indigo-600">
        Create Account
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        Register
      </button>
    </form>
  </div>
);
}
