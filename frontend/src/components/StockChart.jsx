import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockChart = ({ historicalData, theme, currency }) => {
  if (!historicalData.length) return null;

  return (
    <div className="chart-section">
      <h3>📈 Price History (Last 30 Days)</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#333' : '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [
                `${currency}${parseFloat(value).toFixed(2)}`,
                name === 'close' ? 'Closing Price' : name
              ]}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-info">
        <p>💡 This chart shows the closing prices over the last 30 trading days</p>
        <p>🔄 Data updates automatically with live market prices</p>
      </div>
    </div>
  );
};

export default StockChart;
