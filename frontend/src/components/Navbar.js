import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hide Navbar on Login and Register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  if (hideNavbar) return null;

  // ✅ Logout function
  const handleLogout = () => {
    // Clear any stored tokens or user data (if implemented)
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        
        {/* 🌟 Logo / Brand */}
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/home")}
        >
          InvestMate 💹
        </h1>

        {/* 🔗 Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/home"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/youtube"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            Videos
          </Link>
          <Link
            to="/glossary"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            Glossary
          </Link>
          <Link
            to="/stockcalculator"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            Stock Calculator
          </Link>
        </div>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
