import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "employee",
  });

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/user/login", form);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);
      setAuth({ token: res.data.token, role: form.role });

      navigate(form.role === "admin"
        ? "/admin/dashboard"
        : "/user/dashboard"
      );
    } else {
      alert(res.data);
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="w-full border p-2 rounded"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>

      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  </div>
);
}
