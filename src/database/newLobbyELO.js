const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase', // The database you created earlier
});

async function insertData() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Insert data into the 'users' table
    const insertQuery = 'INSERT INTO scoreSheet (lobbyID, date, elo, players) VALUES ($1, $2, $3, $4)';
    


    const values = [ 'ourWingspan',"1-4-2024",{ Bobby: 1000, Joe: 1000, Tyler: 1000 },["Bobby","Joe","Tyler"]]
  
    for (const row of values) {
    await client.query(insertQuery, row);
    console.log('Inserted:', row);    
    console.log('Data inserted successfully!');
    }
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end();
  }
}

insertData();







