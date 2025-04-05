const { Client } = require('pg');

// Connect to PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres', // Connect to the default 'postgres' database
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');
    
    // Create a new database
    const createDbQuery = 'CREATE DATABASE mydatabase';
    await client.query(createDbQuery);
    console.log('Database created successfully!');

  } catch (err) {
    console.error('Error creating database:', err.stack);
  } finally {
    await client.end();
  }
}

createDatabase();
