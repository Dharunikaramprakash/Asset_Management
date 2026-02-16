import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AssetManagement() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    device_name: "",
    device_type: "laptop",
  });

  const fetchAssets = async () => {
    const res = await API.get("/asset/all");
    setAssets(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/user/all"); // create this backend route
    setUsers(res.data.filter(u => u.role === "employee"));
  };

  useEffect(() => {
    fetchAssets();
    fetchUsers();
  }, []);

  const addAsset = async () => {
    await API.post("/asset/create", form);
    fetchAssets();
  };

  const deleteAsset = async (id) => {
    await API.delete("/asset/delete", { data: { assetId: id } });
    fetchAssets();
  };

  const assignAsset = async (assetId, userId) => {
    await API.post("/asset/assign", { assetId, userId });
    fetchAssets();
  };

  return (
    <div>
      <h2>Assets</h2>

      <input
  placeholder="Name"
  onChange={(e) =>
    setForm({ ...form, device_name: e.target.value })
  }
/>

<select
  value={form.device_type}
  onChange={(e) =>
    setForm({ ...form, device_type: e.target.value })
  }
>
  <option value="laptop">Laptop</option>
  <option value="phone">Phone</option>
  <option value="desktop">Desktop</option>
  <option value="mouse">Mouse</option>
  <option value="keyBoard">Keyboard</option>
  <option value="other">Other</option>
</select>

<button onClick={addAsset}>Add</button>

      <ul>
        {assets.map((a) => (
          <li key={a._id}>
            {a.device_name} - {a.device_type}

            {!a.assigned_to && (
              <select onChange={(e) => assignAsset(a._id, e.target.value)}>
                <option>Select Employee</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>
            )}

            <button onClick={() => deleteAsset(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
