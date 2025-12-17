import express from "express";
import axios from "axios";

const router = express.Router();
const FINNHUB_KEY = process.env.FINNHUB_KEY;

// GET live stock price for NSE stocks
// Example: GET /api/stock/price/TCS
router.get("/price/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const response = await axios.get("https://finnhub.io/api/v1/quote", {
      params: {
        symbol: `${symbol}.NS`, // .NS for NSE
        token: FINNHUB_KEY,
      },
    });

    const price = response.data.c; // current price

    if (!price || price === 0) {
      return res.status(404).json({ error: "Price not found" });
    }

    res.json({ price }); // { price: 3450.50 }
  } catch (err) {
    console.error("Finnhub error:", err.message);
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
});

export default router;
