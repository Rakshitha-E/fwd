import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// GET /api/portfolio - Get user's portfolio
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('portfolio');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, portfolio: user.portfolio });
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/portfolio - Add holding to portfolio
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { symbol, quantity, buyPrice } = req.body;

    if (!symbol || !quantity || !buyPrice) {
      return res.status(400).json({ success: false, message: "Symbol, quantity, and buyPrice are required" });
    }

    if (quantity <= 0 || buyPrice <= 0) {
      return res.status(400).json({ success: false, message: "Quantity and buyPrice must be positive" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if holding already exists
    const existingHolding = user.portfolio.find(h => h.symbol === symbol.toUpperCase());

    if (existingHolding) {
      // Update existing holding (average price)
      const totalValue = (existingHolding.quantity * existingHolding.buyPrice) + (quantity * buyPrice);
      const totalQuantity = existingHolding.quantity + quantity;
      existingHolding.buyPrice = totalValue / totalQuantity;
      existingHolding.quantity = totalQuantity;
    } else {
      // Add new holding
      user.portfolio.push({
        symbol: symbol.toUpperCase(),
        quantity,
        buyPrice,
        buyDate: new Date()
      });
    }

    await user.save();
    res.json({ success: true, message: "Holding added successfully", portfolio: user.portfolio });
  } catch (error) {
    console.error("Add holding error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/portfolio/:symbol - Remove holding from portfolio
router.delete("/:symbol", authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.params;
    const { quantity } = req.body; // Optional: remove specific quantity

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const holdingIndex = user.portfolio.findIndex(h => h.symbol === symbol.toUpperCase());

    if (holdingIndex === -1) {
      return res.status(404).json({ success: false, message: "Holding not found" });
    }

    if (quantity && quantity > 0) {
      // Remove specific quantity
      if (quantity >= user.portfolio[holdingIndex].quantity) {
        user.portfolio.splice(holdingIndex, 1);
      } else {
        user.portfolio[holdingIndex].quantity -= quantity;
      }
    } else {
      // Remove entire holding
      user.portfolio.splice(holdingIndex, 1);
    }

    await user.save();
    res.json({ success: true, message: "Holding removed successfully", portfolio: user.portfolio });
  } catch (error) {
    console.error("Remove holding error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
