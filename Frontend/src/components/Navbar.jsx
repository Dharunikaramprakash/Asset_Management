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
  <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold tracking-wide">
        Asset<span className="text-blue-400">System</span>
      </h1>

      <div className="flex items-center gap-6 text-sm font-medium">
        {auth.token && auth.role === "admin" && (
          <Link className="hover:text-blue-400 transition" to="/admin/dashboard">
            Dashboard
          </Link>
        )}

        {auth.token && auth.role === "employee" && (
          <Link className="hover:text-blue-400 transition" to="/user/dashboard">
            Dashboard
          </Link>
        )}

        {auth.token ? (
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link className="hover:text-blue-400 transition" to="/login">
              Login
            </Link>
            <Link
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
);
}
