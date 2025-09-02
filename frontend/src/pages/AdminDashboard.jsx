import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const addUser = async (e) => {
    e.preventDefault();
    await API.post("/admin/user", form);
    setForm({ name: "", email: "", password: "", role: "student" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <form onSubmit={addUser} className="my-4 flex gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded block"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded block"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded block"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded block"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u._id} className="flex justify-between border-b py-2">
            {u.name} ({u.role})
            <button
              onClick={() => deleteUser(u._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
