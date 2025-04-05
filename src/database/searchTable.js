const { Client } = require('pg');

// Set up the database connection
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'mydatabase',
  });

// Connect to the database
client.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));
  const searchName = 'ourWingspan';  // Name to search for

  const query = {
    text: 'SELECT * FROM scoreSheet WHERE lobbyid ILIKE $1', // Replace 'your_table' with the actual table name
    values: [`${searchName}`],  // Use wildcards around the search string for partial matches
  };
  var tempArray;
  var totals = Array(3);
  totals.fill(0);
  client.query(query)
    .then(res => (res.rows.forEach(row => {
      var i = 0;
      row.players.forEach(player =>{
        console.log(`${player}`,row.scores[player]);



        i++;
      })
      
      
      
      // for (let i = 0; i<row.players.length; i++)
      // {
      //   totals[i] += Object.values(row.scores)[i];
      // }
      
      //tempArray = Object.values(row.scores);
      //tempInt = row.scores.Bobby;
      //console.log(tempArray); // Output all matching rows
      //console.log(totals);
      //console.log(tempInt);
    })))
    .catch(err => {
      console.error('Query error', err.stack);
    })
    .finally(() => {
      client.end();  // Close the connection to the database
    });
  