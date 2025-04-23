// DotGraphComponent.js
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DotGraphComponent = ({ data, names }) => {

  const allValues = data.flatMap(d => names.map(name => d[name]));
  const minY = Math.round(Math.min(...allValues));
  const maxY = Math.round(Math.max(...allValues));

  if (data.length > 0) {
    // Convert line-chart-style data into scatter-format
    const seriesData = names.map(name => ({
      name,
      data: data.map(d => ({ x: d.date, y: d[name] }))
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="x" name="Date" />
          <YAxis type="number" domain={[minY - 50, maxY + 50]} name="Value" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />

          {seriesData.map((series, index) => (
            <Scatter
              key={index}
              name={series.name}
              data={series.data}
              fill={`hsl(${(index * 360) / names.length}, 100%, 50%)`}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default DotGraphComponent;
