 



 //Split the data into individual Games




 //Split Scores by Game

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
const games = ["Wingspan","Catan"];




 function splitScores(inputScores)
    {
    const groupedByGame = {}; 

    inputScores.forEach(([group, game, date, scores]) => {
        const temp = scores;
        temp.date = date;
    if (!groupedByGame[game]) {
        groupedByGame[game] = [];
    }
    groupedByGame[game].push(temp);
    });
    console.log(groupedByGame);
    return groupedByGame;


 }

function calculateELO()
{
    
}



 splitScores(values,games);

 //Calculate Table Information





 export function run()
 {

 }



























//  Total ELO
//  Wingspan Scores
//  Wingspan Table
//  Wingspan ELO
//  Catan Scores
//  Catan Table
//  Catan ELO
//  ...


// Open client an d



