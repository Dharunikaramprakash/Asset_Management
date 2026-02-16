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
    <div>
      <h2>Requests</h2>
      {requests.map((r) => (
        <div key={r._id}>
          {r.user?.name} - {r.asset?.device_name} - {r.status}

          {r.status === "pending" && (
            <>
              <button onClick={() => approve(r._id)}>Approve</button>
              <button onClick={() => reject(r._id)}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
