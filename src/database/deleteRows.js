import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase',
});




async function insertData() {

    try {
        await client.connect().catch((err) => console.error("Connection error", err.stack));




        const res = await client.query('DELETE FROM scoreSheet');
        console.log("deleted successfully");
      }     
 catch (err) {
    console.log("Failed");   
  console.error('Error inserting data:', err.stack);
} finally {
console.log("ending");
  await client.end();
}
}

insertData();