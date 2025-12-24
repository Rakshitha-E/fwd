import React from "react";
import Navbar from "../components/Navbar";
import LiveGraphs from "../components/LiveGraphs";
import { TrendingUp, Shield, BarChart3, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

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
    { title: "Portfolio Value", value: "₹12,450", color: "bg-blue-500", icon: BarChart3, change: "+2.4%" },
    { title: "Daily Change", value: "+₹230", color: "bg-green-500", icon: TrendingUp, change: "+1.8%" },
    { title: "Invested Capital", value: "₹10,000", color: "bg-yellow-500", icon: Shield, change: "Active" },
    { title: "ROI", value: "24%", color: "bg-purple-500", icon: Star, change: "This Month" },
  ];

  // Sample featured stocks
  const featuredStocks = [
    { symbol: "RELIANCE", price: 2750.23, change: "+1.25", changePercent: "+0.05%", volume: "2.3M" },
    { symbol: "TCS", price: 3820.5, change: "-12.4", changePercent: "-0.32%", volume: "1.8M" },
    { symbol: "HDFC", price: 2520.3, change: "+8.7", changePercent: "+0.35%", volume: "3.1M" },
    { symbol: "INFY", price: 1410.4, change: "+5.2", changePercent: "+0.37%", volume: "4.2M" },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get deep insights into market trends, technical analysis, and portfolio performance with our powerful analytics tools."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your financial data is protected with bank-level security. Trade with confidence on our secure platform."
    },
    {
      icon: TrendingUp,
      title: "Real-time Data",
      description: "Access live market data, real-time quotes, and instant notifications to stay ahead of market movements."
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Join thousands of investors sharing insights, strategies, and market analysis in our vibrant community."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Retail Investor",
      content: "InvestMate has transformed how I approach investing. The analytics are incredible and have helped me make better decisions.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Portfolio Manager",
      content: "The real-time data and portfolio tracking features are exactly what professional investors need. Highly recommended.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Day Trader",
      content: "Fast, reliable, and feature-rich. InvestMate keeps me connected to the markets 24/7.",
      rating: 5
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative">
          <div className="flex flex-col lg:flex-row items-center min-h-[80vh] py-20">
            <div className="lg:w-1/2 mb-12 lg:mb-0 fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                #1 Investment Platform in India
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Smart Investing
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
                Track markets, analyze stocks, and grow your wealth with India's most trusted investment platform. Join 500,000+ investors making smarter decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary btn-lg group">
                  Start Investing Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn btn-secondary btn-lg">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center mt-8 space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">500K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">₹2.5T+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Assets Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                    <h3 className="text-xl font-bold mb-2">Portfolio Performance</h3>
                    <div className="flex justify-between items-center">
                      <span>Total Value</span>
                      <span className="text-2xl font-bold">₹12,450</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>24h Change</span>
                      <span className="text-green-300">+₹230 (+1.8%)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {featuredStocks.slice(0, 3).map((stock, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">₹{stock.price}</div>
                        </div>
                        <div className={`text-right ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="font-semibold">{stock.change}</div>
                          <div className="text-sm">{stock.changePercent}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Investment at a Glance</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Real-time insights into your portfolio performance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center fade-in group hover:scale-105 transition-transform" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-4 group-hover:scale-110 transition-transform ${
                    stat.color === 'bg-blue-500' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    stat.color === 'bg-green-500' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    stat.color === 'bg-yellow-500' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                    'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose InvestMate?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to succeed in the stock market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card fade-in" style={{animationDelay: `${index * 0.1 + 0.6}s`}}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stocks Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Market Leaders</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Track the performance of India's top stocks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStocks.map((stock, index) => (
              <div key={index} className="card fade-in hover:shadow-xl transition-shadow" style={{animationDelay: `${index * 0.1 + 0.8}s`}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">NSE</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    stock.change.startsWith('+')
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {stock.changePercent}
                  </span>
                </div>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">₹{stock.price.toLocaleString()}</p>
                  <p className={`text-sm font-semibold ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change} ({stock.changePercent})
                  </p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Volume: {stock.volume}</span>
                  <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">View Chart</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Join thousands of satisfied investors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card fade-in text-center" style={{animationDelay: `${index * 0.1 + 1.0}s`}}>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join India's fastest-growing investment community today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary btn-lg bg-white text-blue-600 hover:bg-gray-100">
              Create Free Account
            </button>
            <button className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </button>
          </div>
          <div className="flex justify-center items-center mt-8 space-x-8 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free Account
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No Hidden Fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              24/7 Support
            </div>
          </div>
        </div>
      </section>

      {/* Live Stock Charts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Live Market Data</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Stay updated with real-time market movements</p>
          </div>
          <div className="fade-in" style={{animationDelay: '1.2s'}}>
            <LiveGraphs />
          </div>
        </div>
      </section>
    </div>
  );
}
