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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
