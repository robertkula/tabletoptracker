// components/ChartComponent.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  // Data for the chart
  const data = [
    { month: 'January', sales: 65 },
    { month: 'February', sales: 59 },
    { month: 'March', sales: 80 },
    { month: 'April', sales: 81 },
    { month: 'May', sales: 56 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;