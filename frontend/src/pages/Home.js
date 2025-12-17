import React from "react";
import Navbar from "../components/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Home() {
  // Sample chart data
  const chartData = [
    { date: "Mon", value: 150 },
    { date: "Tue", value: 165 },
    { date: "Wed", value: 160 },
    { date: "Thu", value: 180 },
    { date: "Fri", value: 175 },
  ];

  // Sample stats cards
  const stats = [
    { title: "Portfolio Value", value: "$12,450", color: "bg-blue-500" },
    { title: "Daily Change", value: "+$230", color: "bg-green-500" },
    { title: "Invested Capital", value: "$10,000", color: "bg-yellow-500" },
    { title: "ROI", value: "24%", color: "bg-purple-500" },
  ];

  // Sample featured stocks
  const featuredStocks = [
    { symbol: "AAPL", price: 175.23, change: "+1.25" },
    { symbol: "TSLA", price: 820.5, change: "-12.4" },
    { symbol: "GOOGL", price: 1520.3, change: "+8.7" },
    { symbol: "AMZN", price: 3110.4, change: "+5.2" },
  ];

  return (
    <>
      <Navbar />
      <div className="mt-24 p-6 bg-gray-50 min-h-screen">

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to InvestMate!</h1>
          <p className="text-gray-600 text-lg">
            Track markets, analyze stocks, and grow your investments like a pro.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition`}>
              <p className="text-sm font-semibold">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Featured Stocks Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Featured Stocks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStocks.map((stock, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{stock.symbol}</h3>
                  <p className={`font-semibold ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change}
                  </p>
                </div>
                <p className="text-gray-500 mt-2">Price: ${stock.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Portfolio Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </>
  );
}
