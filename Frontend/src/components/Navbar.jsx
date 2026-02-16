import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null });
    navigate("/login");
  };

  return (
    <nav>
    

      {auth.token && auth.role === "admin" && (
        <>
          <Link to="/admin/dashboard">Admin</Link>
        </>
      )}

      {auth.token && auth.role === "employee" && (
        <>
          <Link to="/user/dashboard">User</Link>
        </>
      )}

      {auth.token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
