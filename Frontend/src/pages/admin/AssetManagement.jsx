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
  <div className="p-10">
    <h2 className="text-2xl font-bold mb-6">Assets</h2>

    <div className="flex gap-4 mb-6">
      <input
        className="border p-2 rounded w-1/3"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, device_name: e.target.value })
        }
      />

      <select
        className="border p-2 rounded"
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

      <button
        onClick={addAsset}
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </div>

    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Assign</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a._id} className="border-t">
              <td className="p-3">{a.device_name}</td>
              <td className="p-3">{a.device_type}</td>

              <td className="p-3">
                {!a.assigned_to && (
                  <select
                    className="border p-1 rounded"
                    onChange={(e) => assignAsset(a._id, e.target.value)}
                  >
                    <option>Select Employee</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              <td className="p-3">
                <button
                  onClick={() => deleteAsset(a._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
