

import ChartRenderer from "../components/chartRenderer.js";
import LineChartComponent from '../components/ChartComponent';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [datasets, setData] = useState([]);



  useEffect(() => {
      const fetchData = async () => {
        try {
          // First fetch
    
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
          // console.log("DATA2",data2);
          setData(data2);
  
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);



  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dynamic Recharts Line Graphs</h2>
      <ChartRenderer datasets={datasets} />
    </div>
  );
};

export default App;
