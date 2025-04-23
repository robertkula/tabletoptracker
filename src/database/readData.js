import pkg from 'pg';
import { addSyntheticLeadingComment } from "typescript";
import * as basicELO from "../calculation/basicELO.js"



const { Client } = pkg;

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
    const selectQuery = "SELECT * FROM scoreSheet WHERE lobbyID ILIKE 'daboys' ORDER BY created_at DESC";
    const lobbySelectQuery = "SELECT * FROM lobbySheet WHERE lobbyID ILIKE 'daboys' ORDER BY created_at DESC";

    const res = await client.query(selectQuery);
    const res2 = await client.query(lobbySelectQuery);
    console.log(res2.rows);
    var scores = Array(res.rows.length);
    
    var players = res2.rows[0].players;
    let i = 0;
    res.rows.forEach(row => {
      scores[i] = row.scores;

      i++;
      //console.log(`Lobby: ${row.lobbyid} \nDate: ${row.date} \ELO: ${JSON.stringify(row.elo,null,2)} \nPlayers: ${JSON.stringify(row.players,null,2)}`);
      //console.log(row);
   });
    var output = basicELO.test(scores,players);
    console.log("OUTPUT",output);
  } catch (err) {
    console.error('Error Reading data:', err.stack);
  } finally {
    await client.end();
  }
}

queryData();