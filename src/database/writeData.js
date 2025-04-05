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
    const insertQuery = 'INSERT INTO scoreSheet (lobbyID, date, scores, players) VALUES ($1, $2, $3, $4)';
    


    const values = [[ 'ourWingspan',"1-4-2024",{ Bobby: 18, Joe: 99, Tyler: 5 },["Bobby","Joe","Tyler"]],
    [ 'ourCatan',"1-5-2024",{ Bobby: 6, Joe: 2, Tyler: 1 },["Bobby","Joe","Tyler"]],
    [ 'ourWingspan',"1-6-2024",{ Bobby: 55, Joe: 44, Tyler: 33 },["Bobby","Joe","Tyler"]],
    [ 'ourWingspan',"1-6-2024",{ Bobby: 33, Joe: 41, Tyler: 21 },["Bobby","Joe","Tyler"]],
    [ 'ourCatan',"1-7-2024",{ Bobby: 4, Joe: 2, Tyler: 10 },["Bobby","Joe","Tyler"]],
    [ 'ourWingspan',"1-7-2024",{ Bobby: 65, Joe: 92, Tyler: 36 },["Bobby","Joe","Tyler"]],
    [ 'ourWingspan',"1-8-2024",{ Bobby: 1, Joe: 54, Tyler: 85 },["Bobby","Joe","Tyler"]]
  ]
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
