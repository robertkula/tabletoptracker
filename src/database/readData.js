const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase',
});

async function queryData() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Query data from the 'users' table
    const selectQuery = 'SELECT * FROM eloSheet ORDER BY created_at DESC LIMIT 1';
    
    const res = await client.query(selectQuery);
    console.log('Users:');
    res.rows.forEach(row => {
       console.log(`Lobby: ${row.lobbyid} \nDate: ${row.date} \ELO: ${JSON.stringify(row.elo,null,2)} \nPlayers: ${JSON.stringify(row.players,null,2)}`);
       //console.log(row);
    });
  } catch (err) {
    console.error('Error querying data:', err.stack);
  } finally {
    await client.end();
  }
}

queryData();