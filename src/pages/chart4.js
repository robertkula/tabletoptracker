// App.js
import React, { useState, useEffect } from 'react';
import LineChartComponent from '../components/ChartComponent';

const App = () => {
  // Sample data: An array of objects with different values for each line
  const [data, setData] = useState([]);
  console.log("TEST2");
  useEffect(() => {
    // Simulate fetching data or updating dynamically
    const fetchData = () => {
      const newData = [
        { name: 'Jan', value1: 4000, value2: 2400, value3: 2400 },
        { name: 'Feb', value1: 3000, value2: 1398, value3: 2210 },
        { name: 'Mar', value1: 2000, value2: 9800, value3: 2290 },
        { name: 'Apr', value1: 2780, value2: 3908, value3: 2000 },
        { name: 'May', value1: 1890, value2: 4800, value3: 2181 },
        { name: 'Jun', value1: 2390, value2: 3800, value3: 2500 }
      ];

      setData(newData);
    };
    
    fetchData();
  }, []); // Run once on component mount

  return (
    <div>
      <h1>Dynamic Line Chart Example</h1>
      <LineChartComponent data={data} />
    </div>
  );
};

export default App;
