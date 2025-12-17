import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Glossary from "./pages/Glossary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Videos from "./pages/Videos";
import DynamicInvestmentCalculator from "./pages/StockCalculator";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // change to false if not logged in

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-3">
            <h1 className="text-2xl font-bold tracking-wide">Investmate 💼</h1>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/glossary"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                Glossary
              </NavLink>

              <NavLink
                to="/videos"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                Videos
              </NavLink>

              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  }`
                }
              >
                Calculator
              </NavLink>

              {!isLoggedIn ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `hover:text-yellow-300 transition ${
                        isActive ? "text-yellow-300 font-semibold" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `hover:text-yellow-300 transition ${
                        isActive ? "text-yellow-300 font-semibold" : ""
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <LogoutButton setIsLoggedIn={setIsLoggedIn} />
              )}
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/calculator" element={<DynamicInvestmentCalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-3 mt-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} Investmate — Empowering Smarter Investments
          </p>
        </footer>
      </div>
    </Router>
  );
}

/* 🧩 Logout Button Component */
function LogoutButton({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token (if any)
    localStorage.removeItem("user");
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 bg-yellow-400 text-blue-900 px-3 py-1.5 rounded-lg font-semibold hover:bg-yellow-300 transition"
    >
      Logout
    </button>
  );
}

export default App;
