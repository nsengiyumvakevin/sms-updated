import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Navbar from './components/Navbar'

function PrivateRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to="/login" />;
  if (allowed && !allowed.includes(user.role)) return <div className="p-4">Not allowed</div>;
  return children;
}

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<PrivateRoute allowed={["admin"]}><AdminDashboard/></PrivateRoute>} />
        <Route path="/teacher" element={<PrivateRoute allowed={["teacher"]}><TeacherDashboard/></PrivateRoute>} />
        <Route path="/student" element={<PrivateRoute allowed={["student"]}><StudentDashboard/></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
