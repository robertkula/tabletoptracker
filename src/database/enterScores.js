import * as calculateELO from "../calculation/calculateELO.js"
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase',
});

const searchName = 'ourWingspan';  // Name to search for
const query = {
  text: 'SELECT * FROM eloSheet WHERE lobbyid ILIKE $1 ORDER BY created_at DESC LIMIT 1', // Replace 'your_table' with the actual table name
  values: [`${searchName}`],  // Use wildcards around the search string for partial matches
};
const scores = {"Tyler":3,"Joe":1,"Bobby":2};
const insertQuery = 'INSERT INTO eloSheet (lobbyID, date, elo, players) VALUES ($1, $2, $3, $4)';

var i = 0;
var oldELO;
var playerList;
var oldELOArray;
var scoreArray;
var finalELO = {};

async function insertData() {

try {
  await client.connect().catch((err) => console.error("Connection error", err.stack));
  const res = await client.query(query);
  const info = res.rows[0];

  oldELO = {...info.elo};
  console.log(info);
  playerList = [...info.players];
  oldELOArray = Array(oldELO.length);
  scoreArray = Array(oldELO.length);

  playerList.forEach(player =>{
    oldELOArray[i] = oldELO[player];
    scoreArray[i] = scores[player];
  console.log(`${player}`,info.elo[player]);
  i++;
  })
    const postgameELO = calculateELO.calculate(scoreArray,oldELOArray);
    i=0;
    playerList.forEach(player =>{
      finalELO[player] = postgameELO[i];
      i++
    })

        
    
    
    var row = [ 'ourWingspan',"2-3-2024",{},["Bobby","Joe","Tyler"]]
    row[2] = finalELO;
    await client.query(insertQuery, row);
    console.log("TEST");
  }
 catch (err) {
  console.error('Error inserting data:', err.stack);
} finally {
  await client.end();
}
}

insertData();




