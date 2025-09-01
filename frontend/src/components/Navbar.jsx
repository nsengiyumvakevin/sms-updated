import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <nav className="flex justify-between p-4 bg-yellow-500">
      <div className=" text-2xl">School Management System</div>
      <div className="space-x-4 text-2xl">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user && (
          <span>
            {user.name} ({user.role})
          </span>
        )}
        {user && (
          <button onClick={logout} className="ml-2 text-red-600">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
