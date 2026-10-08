import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Authen";

import Navbar from "../components/Navbar";



const Dashboard = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    alert("Logged out successfully");

    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center">

            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500"
            />

            <h1 className="text-3xl font-bold mt-5">
              Welcome, {user.fullName}
            </h1>

            <p className="text-gray-500 mt-2">
              Your Profile
            </p>

          </div>

          <div className="mt-8 space-y-4">

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                Username
              </p>

              <p className="font-semibold">
                @{user.username}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="font-semibold">
                {user.fullName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
                Account Created
              </p>

              <p className="font-semibold">
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;