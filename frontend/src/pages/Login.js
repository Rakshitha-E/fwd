import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      // Clear email error when user starts typing
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'password') {
      setPassword(value);
      // Clear password error when user starts typing
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-3 text-center">{message}</p>}

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
