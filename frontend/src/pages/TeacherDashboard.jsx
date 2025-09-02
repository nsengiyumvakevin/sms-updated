import { useEffect, useState } from "react";
import API from "../api";

export default function TeacherDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const fetchSubjects = async () => {
    const res = await API.get("/student/subjects");
    setSubjects(res.data);
  };

  const addSubject = async (e) => {
    e.preventDefault();
    await API.post("/teacher/subject", { name });
    setName("");
    fetchSubjects();
  };

  const deleteSubject = async (id) => {
    await API.delete(`/teacher/subject/${id}`);
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <form onSubmit={addSubject} className="my-4 flex gap-2">
        <input
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
      </form>

      <ul>
        {subjects.map((s) => (
          <li key={s._id} className="flex justify-between border-b py-2">
            {s.name}
            <button
              onClick={() => deleteSubject(s._id)}
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
