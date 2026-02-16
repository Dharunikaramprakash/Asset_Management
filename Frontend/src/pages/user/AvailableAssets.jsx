import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AvailableAssets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    API.get("/asset/available").then(res => setAssets(res.data));
  }, []);

  const requestAsset = async (id) => {
    await API.post("/request/raise", { assetId: id });
    alert("Request Raised");
  };

  return (
    <div>
      <h2>Available Assets</h2>
      {assets.map((a) => (
        <div key={a._id}>
          {a.device_name}
          <button onClick={() => requestAsset(a._id)}>Request</button>
        </div>
      ))}
    </div>
  );
}
