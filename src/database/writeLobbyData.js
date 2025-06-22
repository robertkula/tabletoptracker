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
    const insertQuery = 'INSERT INTO lobbysheet (lobbyID, date, players, games) VALUES ($1, $2, $3, $4)';
    


    const values = ['daboys','2-15-2025',['Bobby','Joe','Tyler','Chris','Heinrich','Gerry'],['7 Wonders','Wingspan']];
    await client.query(insertQuery, values);
    console.log('Inserted:', values);    
    console.log('Data inserted successfully!');
    
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end();
  }
}

insertData();
