const { Client } = require('pg');

// Set up the database connection
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'mydatabase',
  });

const dropTable = async () => {
  try {
    // Connect to the database
    await client.connect();

    // Define the DROP TABLE query
    const dropTableQuery = 'DROP TABLE IF EXISTS scoreSheet;';

    // Execute the query
    await client.query(dropTableQuery);
    console.log('Table deleted successfully');
  } catch (err) {
    console.error('Error deleting table:', err.stack);
  } finally {
    // Close the connection
    await client.end();
  }
};

dropTable();
