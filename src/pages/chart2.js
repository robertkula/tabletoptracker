// client/src/App.js
import React from 'react';
import * as calculateELO from '../calculation/calculateELO.js'

function App() {
  function handleClick() {

    
    fetch('/api/button-clicked')  // Call the API route on the Node server
      .then((response) => response.text())
      .then((data) => alert(data));  // Display the response in an alert

      
  };

  return (
    <div>
      <h1>React Button with Node.js</h1>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default App;
