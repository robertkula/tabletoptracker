import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormHelperText } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import * as calculateELO from "../calculation/calculateELO.js"

const CsvAppender = () => {
  const [inputValues, setInputValues] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [columnSums, setColumnSums] = useState([]); // Store the column sums

  // Handle input changes for dynamic fields
  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  // Handle file input change
  const handleFileUpload = (event) => {
    changeBackground("blue");
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
          setHeaders(result.data[0]); // First row is headers
          setInputValues(Array(result.data[0].length).fill('')); // Initialize input values array
          setErrors(Array(result.data[0].length).fill('')); // Initialize error array
          calculateColumnSums(result.data); // Calculate the sums of each column
        },
      });
    }
  };
  function changeBackground(color) {
    document.body.style.background = color;
 }
  // Function to validate inputs before appending to CSV
  const validateInputs = () => {
    const newErrors = [];
    let isValid = true;

    // Validate the Date input (index 0)
    if (!inputValues[0]) {
      newErrors[0] = 'Date is required';
      isValid = false;
    } else {
      newErrors[0] = ''; // Clear the error for Date if valid
    }

    // Validate numeric inputs (index 1 to end)
    for (let i = 1; i < inputValues.length; i++) {
      if (!inputValues[i]) {
        newErrors[i] = `${headers[i]} is required`;
        isValid = false;
      } else if (isNaN(inputValues[i])) {
        newErrors[i] = `${headers[i]} must be a number`;
        isValid = false;
      } else {
        newErrors[i] = ''; // Clear error if the input is a valid number
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to append the new data to the CSV array
  const appendToCsv = () => {
    if (validateInputs()) {
      const updatedData = [...csvData, inputValues]; // Append the input values to CSV data
      //calculateColumnSums(updatedData); // Recalculate column sums after appending data
      var scores = [...inputValues.map(str => parseInt(str, 10))];
      const pregameELO = [...csvData[csvData.length-1].map(str => parseInt(str, 10))];
      const postgameELO = calculateELO.calculate(scores,pregameELO);
      setColumnSums(postgameELO);
      const finalArray = [...updatedData, postgameELO]; // Append the input values to CSV data
      setCsvData(finalArray);
      setInputValues(Array(headers.length).fill('')); // Clear input fields
    }
  };




  // Function to calculate the sum of each column (ignoring the first column, Date)
  const calculateColumnSums = (data) => {
    var sums = Array(headers.length).fill(0); // Initialize sums for each column
    // Iterate through the rows and sum the numeric values for each column
    for (let i = 0; i < sums.length; i++)
    {
      for (let j=1;j<data.length;j++)
      {
        const value = parseInt(data[j][i]);
        sums[i]+=value;
      }
    }
    setColumnSums(sums); // Update the state with the column sums
  };

  // Function to download the updated CSV file
  const downloadCsv = () => {
    const csvContent = Papa.unparse(csvData); // Convert the CSV array back to CSV format
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'wingspan_scores.csv'); // Trigger the download of the CSV file
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Append to Wingspan Scores CSV
      </Typography>
      
      {/* File upload for loading the CSV */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ marginBottom: '20px' }}
      />
      
      {/* Dynamically generate input fields based on CSV columns */}
      {headers.length > 0 && (
        <>
          <Box sx={{ display: 'grid', gap: 2, marginBottom: 2 }}>
            {headers.map((header, index) => (
              <Box key={index}>
                <TextField
                  label={header} // First input is labeled "Date"
                  variant="outlined"
                  fullWidth
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  error={Boolean(errors[index])}
                  helperText={errors[index]}
                  inputProps={{
                    pattern: index === 0 ? '.*' : '[0-9]*', // Allow all for Date, only numbers for others
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={appendToCsv}>
              Add Row
            </Button>
            <Button variant="contained" color="secondary" onClick={downloadCsv}>
              Download CSV
            </Button>
          </Box>
        </>
      )}

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6">CSV Preview:</Typography>
        <pre>{csvData.map(row => row.join(', ')).join('\n')}</pre>
      </Box>

      {/* Display the sums of each column */}
      {columnSums.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Column Sums:</Typography>
          <ul>
            {columnSums.map((sum, index) => (
              <li key={index}>
                {headers[index]}: {sum}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default CsvAppender;
