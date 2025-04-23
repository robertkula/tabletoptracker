
  
  
  function calculateOutcomes(arr){
    const output = Array(arr.length);
    output.fill(0);
    for (let i = 1; i < arr.length; i++) {
        output[i-1] = 1-((i-1)/(arr.length-1))
        }

        return output;
  }

  function calculateRealOutcomes(inputScores,inputOutcomes){


    var output = Array(inputOutcomes.legnth);
    output.fill(0);
    var currentScore = 0;
    var currentOutcome = 0;
    var realOutcome = 0;
    var scoreCount = 0;
    var cont = true;
    for (let i = 0,j=0; i < (inputOutcomes.length);) {
        currentScore = inputScores[i];
        currentOutcome = inputOutcomes[i];
        scoreCount = 1;
        j=i;
        cont = true;
        while (j < (inputOutcomes.length-2) && cont == true)
            {
                if(currentScore == inputScores[j+1])
                {
                    scoreCount++;
                    currentOutcome += inputOutcomes[j+1];
                    j++;
                }
                else
                {
                    cont = false;
                }
                
            }

            realOutcome = currentOutcome/scoreCount;
            for (let k = scoreCount; k>0;k--,i++)
            { 
                output[i] = realOutcome;
            }
        }
        
        return output;
  }

  function orderRealOutcomes(inputScores,inputScoresOrdered,inputOutcomes)
  {


    
    var output = Array(inputOutcomes.length);
    output.fill(0);
    for (let i = 0; i < output.length;i++)
        {
            for (let j=0; j < output.length; j++)
            {
                if(inputScores[i]==inputScoresOrdered[j])
                {
                    
                    output[i]=inputOutcomes[j];
                }
            }    
        }


    return output;
  }

  export function calculateELO(pregameELO,realOutcome)
  {
    var expectedOutcome = Array(pregameELO.length);
    var postgameELO = Array(pregameELO.length);
    var power = Array(pregameELO.length);
    var diff = Array(pregameELO.length);
    var over4 = Array(pregameELO.length);

    expectedOutcome.fill(0);
    postgameELO.fill(0);

    //Caculates the Average Opponent
    var averageOpponent = Array(pregameELO.length)
    var opponents = pregameELO.length-1;
    var runningTotal = 0;
    for (let i=0;i<pregameELO.length;i++)
    {
        runningTotal=0;
        for (let j=0; j<pregameELO.length;j++)
        {
            if (i!=j)
            {
                runningTotal+=pregameELO[j];
            }
        }
        averageOpponent[i] = runningTotal/opponents;
    }

    for (let l=0; l<pregameELO.length; l++)
    {

        power[l] = 10**((pregameELO[l]-averageOpponent[l])/400);
        diff[l] = pregameELO[l]-averageOpponent[l];
        over4[l] = (pregameELO[l]-averageOpponent[l])/400;
        expectedOutcome[l] = 1/(1+10**((averageOpponent[l]-pregameELO[l])/400));
    }
    for (let m=0; m<pregameELO.length; m++)
    {
        postgameELO[m] = pregameELO[m]+40*(realOutcome[m]-expectedOutcome[m]);
           
    }
    return postgameELO;
  }






function calculateRow(inputScores,inputELO) {

    const playerList = Object.keys(inputScores);
    var scores = Array(inputScores.length);
    var elo = Array(inputScores.length);
    var output = {};
    playerList.forEach((player,index) => scores[index] = inputScores[player]);

    playerList.forEach((player,index) => elo[index] = inputELO[player]);

    // console.log("SCORES",scores);
    // console.log("ELO",elo);

    const scoresOrdered = [...scores];

    scoresOrdered.sort(function(a, b){return b-a});
    // console.log("SCORES ORDERED",scoresOrdered);


    const outcomes = calculateOutcomes(scoresOrdered);
    // console.log("outcoimes",outcomes);
    const realOutcomes = calculateRealOutcomes(scoresOrdered,outcomes);
    // console.log("real",realOutcomes);


    const realOutcomesOrdered = orderRealOutcomes(scores,scoresOrdered,realOutcomes);
    // console.log("realOrdered",realOutcomesOrdered);

    const postgameELO = calculateELO(elo,realOutcomesOrdered);

    // console.log("POSTGAME",postgameELO);
    playerList.forEach((player,index) => output[player] = postgameELO[index]);
    return output;
}


function toArray(inputJSON,players){
    var output = Array(inputJSON.length);
    for (let i = 0; i < inputJSON.length; i++)
    {      
        output[i] = players.map(name => inputJSON[i][name]);
    }
    console.log(output);
    return output;
}


function toJSON(inputArray,players){


    
}




export function calculate(scores,players){
    var ELO = Array(scores.length);
    const playerScores = players.reduce((acc, player) => {
        acc[player] = 1000;
        return acc;
      }, {});
      ELO[0] = playerScores;
      

    for (let i = 1;  i < ELO.length; i++)
    {      

        
        ELO[i] = calculateRow(scores[i-1],ELO[i-1]);
        players.forEach(player => { if (!(player in ELO[i])) {
            ELO[i][player] = ELO[i-1][player];
          }})
    }

    return ELO;
 }

 export function test(scores,players){


    //console.log("SCORES",scores[0])
    //console.log("PLAYERS",players)




    return calculate(scores,players)
 }

export default test;

  
