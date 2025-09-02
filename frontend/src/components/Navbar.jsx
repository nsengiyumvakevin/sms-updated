import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">School Management</div>
      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline text-xl">Login</Link>
            <Link to="/signup" className="hover:underline text-xl">SignUp</Link>
          </>
        )}
        {user && (
          <>
            <span>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
