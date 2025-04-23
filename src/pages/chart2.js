// client/src/App.js
import React from 'react';
import * as calculateELO from '../calculation/calculateELO.js'
import TableComponent from '@/components/TableComponent.js';

function App() {

  return (
    <div>
      <h1>React Table with Node.js</h1>
      <TableComponent />
    </div>
  );
}

export default App;
