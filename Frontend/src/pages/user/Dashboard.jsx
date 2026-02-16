import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to="/user/assets">Available Assets</Link>
      <br />
      <Link to="/user/requests">My Requests</Link>
    </div>
  );
}
