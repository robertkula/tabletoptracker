import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

const CSVChart = () => {
  const [data, setData] = useState([]);

  // Handle CSV file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Parse CSV file
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data;
        setData(parsedData); // Set data to be used in chart
      },
      header: true, // Assuming the CSV has headers
      skipEmptyLines: true,
    });
  };

  // Use react-dropzone hook for drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select one</p>
      </div>

      {/* Render Chart if data is available */}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /> {/* Replace 'date' with your column name */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" /> {/* Replace 'value' with your data column name */}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
};

export default CSVChart;
