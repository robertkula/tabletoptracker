import React, { useEffect, useState } from 'react';
import ScoresScatterChart from '../components/scatterPlot2';


const rawScores = [
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
];

const playerData = {};
const gameDates = [];

rawScores.forEach((entry, index) => {
  const { date, ...scores } = entry;
  gameDates.push(date); // Track date by index
  for (const [player, score] of Object.entries(scores)) {
    if (!playerData[player]) {
      playerData[player] = [];
    }
    playerData[player].push({ x: index, y: score, date });
  }
});

console.log(playerData);















const App = () => {
  const [elo, setELO] = useState([]);
  const [scores, setScores] = useState([]);
  const [names, setNames] = useState([]);


  return (
    <div>
    <h1>Scores</h1>
    {playerData && gameDates ? (
      <ScoresScatterChart data={playerData} gameDates={gameDates} />
    ) : (
      <p>Loading scores...</p>  
    )}

  
  </div>
  );
  
};

export default App;
