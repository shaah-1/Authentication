import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authen";


const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Authentication App
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <span>{user.fullName}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;