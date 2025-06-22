import pkg from 'pg';



export default async function handler(req, res) {
  const { Client } = pkg;
  var formated = Array();
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
    const selectQuery = 'SELECT * FROM scoreSheet ORDER BY created_at';
    let i = 0;
    const data = await client.query(selectQuery)
    //console.log("ROWS",data.rows);
    data.rows.forEach(row => {
      const values = Object.values(row.scores);           // [1, 2, 3]
      
      const sum = values.reduce((acc, val) => acc + val, 0);  // 6
      

      const average = sum / values.length; 
      formated[i] = row.scores;
      
      formated[i].date = row.date;
      formated[i].average = average;
      i++;
   });
   //console.log("FRMATED",formated);
   

  } catch (err) {
    console.error('Error querying data:', err.stack);
    res.status(500).json({elo:"Failed to query scores"})
  } finally {
    await client.end();

    res.status(201).json(formated);

  }

}