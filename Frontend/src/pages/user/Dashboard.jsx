import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">
      User Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <Link
        to="/user/assets"
        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-indigo-600">
          Available Assets
        </h2>
        <p className="text-gray-500 mt-2">
          Browse and request company assets.
        </p>
      </Link>

      <Link
        to="/user/requests"
        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-green-600">
          My Requests
        </h2>
        <p className="text-gray-500 mt-2">
          View status of your asset requests.
        </p>
      </Link>

    </div>
  </div>
);
}
