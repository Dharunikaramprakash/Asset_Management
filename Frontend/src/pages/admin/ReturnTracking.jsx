import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ReturnTracking() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get("/request/all");
    setRequests(res.data.filter(r => r.status === "approved"));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const markReturned = async (id) => {
    await API.put(`/request/return/${id}`);
    fetchRequests();
  };

  return (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-slate-800">
        Return Tracking
      </h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-600">
                Employee
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Asset
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No approved assets pending return.
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr
                  key={r._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium text-slate-700">
                    {r.user?.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {r.asset?.device_name}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                      Approved
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => markReturned(r._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      Mark Returned
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
