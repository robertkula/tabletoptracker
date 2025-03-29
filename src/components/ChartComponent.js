// LineChartComponent.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This is the dynamic component that will accept the data as a prop
const LineChartComponent = ({ data }) => {
  // The keys of the data object will determine the number of columns/lines to display
  
  
  if(data.length > 0)
  {
  const keys = Object.keys(data[0]); // Assuming each element in the array has the same structure

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        {/* Dynamically render Line components based on the keys */}
        {keys.map((key, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={key}
            stroke={`hsl(${(index * 360) / keys.length}, 100%, 50%)`} // Random color for each line
            dot={false} // Optional: to hide the dots
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
};

export default LineChartComponent;
