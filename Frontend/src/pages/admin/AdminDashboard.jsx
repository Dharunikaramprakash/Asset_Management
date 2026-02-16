import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/assets">Manage Assets</Link>
      <br />
      <Link to="/admin/requests">Manage Requests</Link>
      <br />
      <Link to="/admin/returns">Return Tracking</Link>
    </div>
  );
}
