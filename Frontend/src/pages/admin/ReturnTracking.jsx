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
    <div>
      <h2>Return Tracking</h2>
      {requests.map((r) => (
        <div key={r._id}>
          {r.user?.name} - {r.asset?.device_name}
          <button onClick={() => markReturned(r._id)}>
            Mark Returned
          </button>
        </div>
      ))}
    </div>
  );
}
