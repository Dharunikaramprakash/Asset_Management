import { Link } from "react-router-dom";

export default function AdminDashboard() {
return (
  <div className="min-h-screen bg-slate-100 p-10">
    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

    <div className="grid md:grid-cols-3 gap-6">
      <Link to="/admin/assets" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        Manage Assets
      </Link>

      <Link to="/admin/requests" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        Manage Requests
      </Link>

      <Link to="/admin/returns" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        Return Tracking
      </Link>
    </div>
  </div>
);
}
