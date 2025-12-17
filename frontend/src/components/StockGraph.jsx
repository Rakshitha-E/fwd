import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function StockGraph({ symbol }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(
        `http://localhost:5000/api/stock/history/${symbol}`
      );
      const data = await res.json();

      const dates = Object.keys(data).slice(0, 30).reverse();
      const prices = dates.map(
        (date) => data[date]["4. close"]
      );

      setChartData({
        labels: dates,
        datasets: [
          {
            label: `${symbol} Closing Price`,
            data: prices,
            borderWidth: 2
          }
        ]
      });
    };

    if (symbol) fetchHistory();
  }, [symbol]);

  if (!chartData) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <Line data={chartData} />
    </div>
  );
}

export default StockGraph;
