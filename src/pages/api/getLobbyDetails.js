import * as get from '../../database/GetDatabaseInfo.js'




export default async function handler(req, res) {
  var response;
if (req.method === 'POST') {




      
      try {
        response = await get.GetDatabase(req.body.lobbyID);
    
    
      } catch (err) {
        console.error('Error querying data:', err.stack);
        res.status(500).json({elo:"Failed to query scores"})
      } finally {
        res.status(201).json(response)
    
      }
  } else {
    // If the method is not POST, return a 405 Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}