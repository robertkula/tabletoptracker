import pkg from 'pg';
import * as ProcessScores from './ProcessScores.js';
import * as ProcessLobby from './ProcessLobby.js';
import * as basicELO from '../calculation/basicELO.js';
import * as formatScores from '../calculation/formatScores.js';
import * as table from '../calculation/tableCalculations.js';
import * as names from '../calculation/calculateNames.js';


export async function GetDatabase(lobbyID) {

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


    const scoreQuery = {
      text: 'SELECT * FROM scoreSheet WHERE lobbyid ILIKE $1 ORDER BY created_at', // Replace 'your_table' with the actual table name
      values: [`${lobbyID}`]
    };
    const lobbyQuery = {
      text: 'SELECT * FROM lobbySheet WHERE lobbyid ILIKE $1 LIMIT 1', // Replace 'your_table' with the actual table name
      values: [`${lobbyID}`]
    };


    const scoreData = await client.query(scoreQuery)
    const lobbyData = await client.query(lobbyQuery)


    console.log(scoreData.rows);

    const processedScores = ProcessScores.process(scoreData);

    const processedLobby = ProcessLobby.process(lobbyData);
    // console.log("PRO SCORES",processedScores.scores)





    const ELO = basicELO.calculate(processedScores.scores,processedLobby.players,processedScores.dates)
    // console.log("ELO",ELO);
    var splitScores = processedScores.game.reduce((acc, item) => {
      acc[item] = Object.keys(processedScores).reduce((acc, item) => {
        acc[item] = Array(); // or any value you want to associate
        return acc;
      }, {elo:[]}); // or any value you want to associate
      return acc;
    }, {});
    
    processedScores.scores.forEach((score,index) =>{
      splitScores[processedScores.game[index]].scores.push(score);
      splitScores[processedScores.game[index]].dates.push(processedScores.dates[index]);
      splitScores[processedScores.game[index]].game.push(processedScores.game[index]);
      splitScores[processedScores.game[index]].scoringMode.push(processedScores.scoringMode[index]);

    
    });
    // console.log("SPLIT",splitScores['Wingspan'].dates);


    Object.keys(splitScores).forEach(game => {
      const totalDates = [processedLobby.start,...processedScores.dates]

        splitScores[game].elo = basicELO.calculate(splitScores[game].scores,processedLobby.players,totalDates)
    });

    
    // var formated = {};
    // formated['games'] = {};
    // formated['elo'] = ELO;
    // formated['names'] = processedLobby.players;
    // // console.log("ELOOOOOOOOOO",formated['elo'])
    



    //calculate each games ELO
    processedLobby.games.forEach(game =>{
      formated['games'][game] = {},
      formated['games'][game]['scores'] = formatScores.format(splitScores[game].scores,splitScores[game].dates,processedLobby.players),
      formated['games'][game]['dates'] = splitScores[game].dates
      })
    
    
    //calculate each games table
    processedLobby.games.forEach(game => {formated['games'][game]['elo'] = basicELO.calculate(splitScores[game].scores,processedLobby.players,splitScores[game].dates)});

    processedLobby.games.forEach(game => {formated['games'][game]['table'] = table.calculate(splitScores[game],processedLobby.players)});
    processedLobby.games.forEach(game => {formated['games'][game]['names'] = names.getNames(splitScores[game].scores)});

    console.log("FORMATED",formated);


    // console.log("FORMATED",formated['Wingspan']['elo']);

  } catch (err) {
    console.error('Error querying data:', err.stack);
    return 0;
  } finally {
    await client.end();
    return formated;
  }
  }
















export default GetDatabase;

GetDatabase("daboys");