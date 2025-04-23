

import React from 'react';
import ChartRenderer from "../components/chartRenderer.js";
import LineChartComponent from '../components/ChartComponent';

const App = () => {
  // Array of datasets
  const datasets = [
    [
        { Joe: 99, Bobby: 18, Tyler: 5, date: '1-4-2024' },
        { Joe: 2, Bobby: 6, Tyler: 1, date: '1-5-2024' },
        { Joe: 44, Bobby: 55, Chris: 55, Tyler: 33, date: '1-6-2024' },
        { Joe: 41, Bobby: 33, Chris: 100, date: '1-6-2024' },
        { Bobby: 4, Tyler: 10, date: '1-7-2024' },
        { Joe: 92, Bobby: 65, Chris: 60, Tyler: 36, date: '1-7-2024' },
        { Joe: 54, Bobby: 1, Tyler: 85, date: '1-8-2024' },
        { Joe: 41, Bobby: 33, Chris: 100, date: '1-9-2024' },
        { Bobby: 45, Tyler: 10, date: '1-10-2024' },
        { Joe: 92, Bobby: 65, Chris: 60, Tyler: 36, date: '1-11-2024' },
        { Joe: 54, Bobby: 13, Tyler: 33, date: '1-12-2024' },
        { Joe: 100, Bobby: 4, Tyler: 34, date: '1-12-2024' },
        { Joe: 80, Bobby: 74, Tyler: 35, date: '1-14-2024' },
        { Joe: 61, Bobby: 6, Tyler: 21, date: '1-15-2024' },
        { Joe: 88, Bobby: 4, Tyler: 9, date: '1-19-2024' }
      ],
    [
      { date: '2024-02-01', value1: 80, value2: 90 },
      { date: '2024-02-02', value1: 85, value2: 95 },
      { date: '2024-02-03', value1: 90, value2: 100 },
    ],
  ];

  // Keys that you want to plot from each dataset
  const names = ['Bobby', 'Joe', 'Chris','Tyler'];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dynamic Recharts Line Graphs</h2>
      <ChartRenderer datasets={datasets} names={names} />
    </div>
  );
};

export default App;
