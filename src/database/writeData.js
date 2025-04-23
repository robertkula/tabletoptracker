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
    const insertQuery = 'INSERT INTO scoreSheet (lobbyID,gameID, date, scores) VALUES ($1, $2, $3, $4)';
    


    const values = [[ 'daboys','Wingspan',"1-4-2024",{ Bobby: 18, Joe: 99, Tyler: 5 }],
    [ 'daboys','Wingspan',"1-5-2024",{ Bobby: 6, Joe: 2, Tyler: 1 }],
    [ 'daboys','Wingspan',"1-6-2024",{ Bobby: 55, Joe: 44, Tyler: 33, Chris: 55 }],
    [ 'daboys','Wingspan',"1-6-2024",{ Bobby: 33, Joe: 41, Chris: 100 }],
    [ 'daboys','Wingspan',"1-7-2024",{ Bobby: 4, Tyler: 10 }],
    [ 'daboys','Wingspan',"1-7-2024",{ Bobby: 65, Joe: 92, Tyler: 36, Chris:60}],
    [ 'daboys','Wingspan',"1-8-2024",{ Bobby: 1, Joe: 54, Tyler: 85 }],
    [ 'daboys','Wingspan',"1-9-2024",{ Bobby: 33, Joe: 41, Chris: 100 }],
    [ 'daboys','Wingspan',"1-10-2024",{ Bobby: 45, Tyler: 10 }],
    [ 'daboys','Wingspan',"1-11-2024",{ Bobby: 65, Joe: 92, Tyler: 36, Chris:60}],
    [ 'daboys','Wingspan',"1-12-2024",{ Bobby: 13, Joe: 54, Tyler: 33 }],
    [ 'daboys','Catan',"1-12-2024",{ Bobby: 4, Joe: 100, Tyler: 34 }],
    [ 'daboys','Wingspan',"1-14-2024",{ Bobby: 74, Joe: 80, Tyler: 35 }],
    [ 'daboys','Catan',"1-15-2024",{ Bobby: 6, Joe: 61, Tyler: 21 }],
    [ 'daboys','Catan',"1-19-2024",{ Bobby: 4, Joe: 88, Tyler: 9 }]







  ]
    for (const row of values) {
    await client.query(insertQuery, row);
    console.log('Inserted:', row);    
    console.log('Data inserted successfully!');
    }
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end();
  }
}

insertData();
