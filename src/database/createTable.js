const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase', // The database you created earlier
});

async function createTable() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Create a new table 'users'
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS scoreSheet (
        gameID SERIAL PRIMARY KEY,
        lobbyID VARCHAR(100) NOT NULL,
        date VARCHAR(100) NOT NULL,
        scores JSONB,
        players TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

      );
    `;
    await client.query(createTableQuery);
    console.log('Table "users" created successfully!');

  } catch (err) {
    console.error('Error creating table:', err.stack);
  } finally {
    await client.end();
  }
}

createTable();
