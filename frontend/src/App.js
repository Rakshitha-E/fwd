import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Importing all pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Glossary from "./pages/Glossary";
import DynamicInvestmentCalculator from "./pages/DynamicInvestmentCalculator";

// ✅ Importing Navbar (make sure it's in /components/Navbar.js)
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* ✅ Navbar stays visible across all pages */}
      <Navbar />

      {/* ✅ Define all routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/youtube" element={<Videos />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/stockcalculator" element={<DynamicInvestmentCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
