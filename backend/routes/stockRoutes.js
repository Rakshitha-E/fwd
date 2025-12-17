import express from "express";
import axios from "axios";

const router = express.Router();
const FINNHUB_KEY = process.env.FINNHUB_KEY; // use your Finnhub key

// GET live stock price for NSE stocks
// Example: /api/stock/price/TCS
router.get("/price/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    // Fetch live stock price from Finnhub
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

    res.json({ price }); // returns { price: 3450.50 }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
});

export default router;
