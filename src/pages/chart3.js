import { useState } from 'react';

export default function Home() {
  const [array1, setArray1] = useState([3, 6, 4, 6, 2]);
  const [array2, setArray2] = useState([1000, 1100, 900, 950, 1150]);
  const [result, setResult] = useState(null);

  // Function to handle the API call
  const processArrays = async () => {
    const response = await fetch('/api/processArrays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ array1, array2 }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("HELLO");
      setResult(data);
    } else {
      const error = await response.json();
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Array Processing</h1>
      <p>Array 1: {JSON.stringify(array1)}</p>
      <p>Array 2: {JSON.stringify(array2)}</p>
      <button onClick={processArrays}>Process Arrays</button>
      {result && (
        <div>
          <h2>Processed Result</h2>
          <p>{JSON.stringify(result)}</p>
        </div>
      )}
    </div>
  );
}
