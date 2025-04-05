const { Client } = require('pg');

// Set up the database connection
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'mydatabase',
  });

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the database');
    createTable(); // Call the function to create the table after the connection
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

// Function to create the table
const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user_data (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      data JSONB
    );
  `;

  client.query(createTableQuery)
    .then(() => {
      console.log('Table created successfully');
      insertSampleData();  // Optionally insert sample data after creating the table
    })
    .catch((err) => {
      console.error('Error creating table', err.stack);
    });
};

// Function to insert sample data
const insertSampleData = () => {
  const insertQuery = `
    INSERT INTO user_data (name, data)
    VALUES ($1, $2)
  `;

  const values = [
    'Alice',
    { age: 30, city: 'New York', hobbies: ['reading', 'cycling'] } // JSON data for the `data` column
  ];

  client.query(insertQuery, values)
    .then(() => {
      console.log('Sample data inserted successfully');
      fetchData(); // Optionally fetch and log the data to verify the insertion
    })
    .catch((err) => {
      console.error('Error inserting data', err.stack);
    });
};

// Function to fetch data from the table
const fetchData = () => {
  const selectQuery = 'SELECT * FROM user_data';

  client.query(selectQuery)
    .then((res) => {
      console.log('Fetched rows:', res.rows); // Logs all rows in the `user_data` table
    })
    .catch((err) => {
      console.error('Error fetching data', err.stack);
    })
    .finally(() => {
      client.end(); // Close the database connection
    });
};
