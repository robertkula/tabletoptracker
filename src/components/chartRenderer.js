import React from 'react';
import LineChartComponent from './ChartComponent'; // Make sure the path is correct

const ChartRenderer = ({ datasets, names }) => {
  return (
    <div>
      {datasets.map((data, index) => (
        <div key={index} style={{ marginBottom: '3rem' }}>
          <h4>Chart {index + 1}</h4>
          <LineChartComponent data={data} names={names} />
        </div>
      ))}
    </div>
  );
};

export default ChartRenderer;
