import pkg from 'pg';
import * as basicELO from '../calculation/basicELO.js';




export default async function handler(req, res) {
  
if (req.method === 'POST') {
    const { Client } = pkg;
      var formated = {};
      formated.players = Array();
      formated.games = Array();



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
        const query = {
          text: 'SELECT * FROM lobbySheet WHERE lobbyid ILIKE $1', // Replace 'your_table' with the actual table name
          values: [`${req.body.lobbyID}`]
        };
        const data = await client.query(query);
        if(data.rows[0] === undefined)
        {
          await client.end();
          return res.status(405).json({ error: 'Not a lobby' });

        }
        formated.date = data.rows[0].date;
        formated.games = data.rows[0].games;
        formated.players = data.rows[0].players;

    
    
    
      } catch (err) {
        console.error('Error querying data:', err.stack);
        res.status(500).json({elo:"Failed to query scores"})
      } finally {
        await client.end();
        res.status(201).json(formated)
    
      }
  } else {
    // If the method is not POST, return a 405 Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}