import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/Authen";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName,
} from "../utils/validation";



const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    checkUsername,
    isLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "username") {
      const error = validateUsername(value);

      setErrors((previous) => ({
        ...previous,
        username: error,
      }));

      if (!error) {
        const exists = await checkUsername(value);

        setErrors((previous) => ({
          ...previous,
          username: exists
            ? "Username already exists"
            : "",
        }));
      }
    }

    if (name === "email") {
      setErrors((previous) => ({
        ...previous,
        email: validateEmail(value),
      }));
    }

    if (name === "password") {
      setErrors((previous) => ({
        ...previous,
        password: validatePassword(value),
      }));
    }

    if (name === "fullName") {
      setErrors((previous) => ({
        ...previous,
        fullName: validateFullName(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(
      formData.username
    );

    const emailError = validateEmail(
      formData.email
    );

    const passwordError = validatePassword(
      formData.password
    );

    const fullNameError = validateFullName(
      formData.fullName
    );

    const validationErrors = {
      username: usernameError,
      email: emailError,
      password: passwordError,
      fullName: fullNameError,
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(
      validationErrors
    ).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    try {
      const exists = await checkUsername(
        formData.username
      );

      if (exists) {
        setErrors((previous) => ({
          ...previous,
          username: "Username already exists",
        }));

        return;
      }

      await register({
        ...formData,

        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",

        createdAt: new Date().toISOString(),
      });

      alert(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Register a new account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Username */}

          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.username
                  ? "border-red-500"
                  : formData.username
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Full Name */}

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.fullName
                  ? "border-red-500"
                  : formData.fullName
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.email
                  ? "border-red-500"
                  : formData.email
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={`w-full border rounded-lg px-4 py-3 pr-16 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : formData.password
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="absolute right-3 top-3 text-blue-600"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isLoading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;