import React from 'react';
import CustomTooltip from './tooltip.js';

import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Legend
} from 'recharts';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

const ScoresScatterChart = ({ data, gameDates }) => {
  const playerNames = Object.keys(data);
  const seen = {};

  const jitterData = (playerData, offset = .7) => {
    return playerData.map((point) => {
      
      
      const key = `${point.x}-${point.y}`;
      
      const jittered = { ...point };
      
      if (seen[key] === undefined) {
        seen[key] = 0;
      } else {
        seen[key] += 1;
        // console.log("We are seeing:",point, " a second time");

      }
      
      jittered.plotY = point.y + seen[key] * offset;
      return jittered;
    });
  };
  


  




  return (
    <ScatterChart
      width={500}
      height={500}
      margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
    >
      <CartesianGrid />
      <XAxis
        dataKey="x"
        name="Game"
        type="number"
        domain={['dataMin', 'dataMax']}
        tickFormatter={(index) => gameDates[index]}
        interval={0}
        angle={-45}
        textAnchor="end"
        height={70}
      />
      <YAxis dataKey="plotY" name="Score" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {playerNames.map((player, index) => (
        <Scatter
        key={player}
        name={player}
        data={jitterData(data[player])}
        fill={colors[index % colors.length]}
      />
      ))}
    </ScatterChart>
  );
};
export default ScoresScatterChart;