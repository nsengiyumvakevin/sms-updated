import { useEffect, useState } from "react";
import API from "../api";

export default function StudentDashboard() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const res = await API.get("/student/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <ul>
        {subjects.map((s) => (
          <li key={s._id} className="border-b py-2">{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
