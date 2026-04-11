import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await API.get("/request/all");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await API.put(`/request/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await API.put(`/request/reject/${id}`);
    fetchRequests();
  };

 return (
  <div className="p-10">
    <h2 className="text-2xl font-bold mb-6">Requests</h2>

    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Asset</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">{r.user?.name}</td>
              <td className="p-3">{r.asset?.device_name}</td>
              <td className="p-3 capitalize">{r.status}</td>
              <td className="p-3 space-x-2">
                {r.status === "pending" && (
                  <>
                    <button
                      onClick={() => approve(r._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(r._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
