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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}
