import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/request/my").then(res => setRequests(res.data));
  }, []);

  return (
    <div>
      <h2>My Requests</h2>
      {requests.map((r) => (
        <div key={r._id}>
          {r.asset?.device_name} - {r.status}
        </div>
      ))}
    </div>
  );
}
