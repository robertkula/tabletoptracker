const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
});

async function insertData() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Insert data into the 'users' table
    const insertQuery = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id';
    const values = ['John Doe', 'john@example.com'];

    const res = await client.query(insertQuery, values);
    console.log('Inserted user with ID:', res.rows[0].id);

  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end();
  }
}

insertData();
