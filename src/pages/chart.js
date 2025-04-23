import React, { useEffect, useState } from 'react';
import ScoresScatterChart from '../components/scatterPlot2';
import * as basicELO from '../calculation/basicELO.js';
import LineChartComponent from '../components/ChartComponent';
import TableComponent from '@/components/TableComponent.js';

const App = () => {
  const [elo, setELO] = useState([]);
  const [scores, setScores] = useState([]);
  const [names, setNames] = useState([]);
  const [dates, setDates] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch
        const response1 = await fetch('http://localhost:3000/api/getScores');

        const data1 = await response1.json();
        const scoresData = data1;
        

        const response2 = await fetch('http://localhost:3000/api/getLobbyDetails', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            lobbyID: 'daboys'
          }),
        });

        const data2 = await response2.json();
        const namesData = data2.players;
        const firstDate = data2.date;
        const gameList = data2.games;


        const scoresStripped = scoresData.map(obj => ({ ...obj }));
        scoresStripped.forEach(obj => {
          delete obj.date;
        });
        console.log("SCORES",scoresData);


        const elo = basicELO.test(scoresStripped,namesData);
        console.log("ELO",elo);
       
  

        const playerData = {};
        const gameDates = [];
        
        scoresData.forEach((entry, index) => {
          const { date, ...scores } = entry;
          gameDates.push(date); // Track date by index
          for (const [player, score] of Object.entries(scores)) {
            if (!playerData[player]) {
              playerData[player] = [];
            }
            playerData[player].push({ x: index, y: score, date });
          }
        });
        console.log("DTES",gameDates);
        console.log("scores",playerData);
        
        console.log("names",namesData);

        setScores(playerData);
        setNames(namesData);
        setDates(gameDates);
        setELO(elo);



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <div>
    <h1>Scores</h1>
    {scores && dates ? (
      <ScoresScatterChart data={scores} gameDates={dates} />
    ) : (
      <p>Loading scores...</p>  
    )}
    {
      (
<TableComponent />


      )}

<h1>ELO</h1>
    {elo && names ? (
      <LineChartComponent data={elo} names={names} />
    ) : (
      <p>Loading scores...</p>  
    )}





   
  </div>







  );
  
};

export default App;
