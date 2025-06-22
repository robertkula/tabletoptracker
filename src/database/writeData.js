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
    const insertQuery = 'INSERT INTO scoreSheet (lobbyID,gameID, date, scores) VALUES ($1, $2, $3, $4)';
    


    const values = [[ 'daboys','Wingspan',"5-17-2025",{ Gerry: 96, Heinrich:95, Tyler:86, Chris: 100}]
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
