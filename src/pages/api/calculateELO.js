import pkg from 'pg';



export default async function handler(req, res) {
  const { Client } = pkg;
  var formated = {};
  formated.elo = Array();
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'mydatabase',
  });
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Query data from the 'users' table
    const selectQuery = 'SELECT * FROM eloSheet ORDER BY created_at';
    let i = 0;
    const data = await client.query(selectQuery)
    formated.players = data.rows[0].players;
    data.rows.forEach(row => {
      formated.elo[i] = row.elo;
      
      formated.elo[i].date = row.date;
      i++;
      //console.log(`Lobby: ${row.lobbyid} \nDate: ${row.date} \ELO: ${JSON.stringify(row.elo,null,2)} \nPlayers: ${JSON.stringify(row.players,null,2)}`);
      //console.log(row);
   });

    formated.players = data.rows[0].players;



  } catch (err) {
    console.error('Error querying data:', err.stack);
    res.status(500).json({elo:"Failed to run"})
  } finally {
    await client.end();
    res.status(201).json(formated)

  }

}