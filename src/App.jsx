import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Protect from "./components/Protect";

import { useAuth } from "./context/Authen";

const HomeRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};

const App = () => {
  return (
    <Routes>

      {/* Home */}

      <Route
        path="/"
        element={<HomeRedirect />}
      />

      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Dashboard */}

      <Route
        path="/dashboard"
        element={
          <Protect>
            <Dashboard />
          </Protect>
        }
      />

      {/* Invalid URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;