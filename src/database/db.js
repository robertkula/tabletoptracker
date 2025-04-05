const { Client } = require('pg');

// Create a new client to connect to your PostgreSQL Docker container
const client = new Client({
  host: 'localhost',          // Docker container is exposed to localhost
  port: 5432,                // PostgreSQL default port
  user: 'postgres',          // Default PostgreSQL user
  password: 'mysecretpassword', // Password set during container creation
  database: 'postgres',      // Default database name
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err.stack);
  });

module.exports = client;