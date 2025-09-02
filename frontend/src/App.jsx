import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/teacher" element={user?.role === "teacher" ? <TeacherDashboard /> : <Navigate to="/login" />} />
        <Route path="/student" element={user?.role === "student" ? <StudentDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
