import React, { useEffect, useState } from 'react';
import LineChartComponent from '../components/ChartComponent';


const App = () => {
  const [elo, setELO] = useState([]);
  const [scores, setScores] = useState([]);
  const [names, setNames] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch
        const response1 = await fetch('http://localhost:3000/api/getScores');
        const data1 = await response1.json();
  
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
  


        // Use local variables to avoid relying on state immediately
        const scoresData = data1.scores;
        const namesData = data2.players;
  
  console.log("SCORES",scoresData);
  console.log("names",namesData);

        setScores(scoresData);
        setNames(namesData);
  
  
        // Second fetch, after the first completes
       
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <div>
    <h1>Scores</h1>
    {scores && names ? (
      <LineChartComponent data={scores} names={names} />
    ) : (
      <p>Loading scores...</p>  
    )}

    <h2>ELO</h2>
    
  </div>
  );
  
};

export default App;
