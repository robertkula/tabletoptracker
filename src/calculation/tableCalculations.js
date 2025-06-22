



function average(scores){
    const sum = scores.reduce((acc, val) => acc + val, 0);  // 6
    const average =  sum / scores.length; 
    return average;
    
}

function stdDev(scores){
    const n = scores.length;
    if (n === 0) return 0;

    const mean = scores.reduce((sum, value) => sum + value, 0) / n;
    const squaredDiffs = scores.map(value => Math.pow(value - mean, 2));
    const variance = squaredDiffs.reduce((sum, value) => sum + value, 0) / n;

    return Math.sqrt(variance);

    
}

function max(scores){

    return Math.max(...scores);

    
}

function min(scores){

    return Math.min(...scores);

    
}




export function calculate(input,players){

    var formatedScores = {'Wins':Array()};
    var formatedOutput = Array();
    players.forEach(player => {formatedScores[player] = Array()});
    input.scores.forEach(game =>{
        var row = Array();
        Object.keys(game).forEach(player =>{
            formatedScores[player].push(game[player])
            row.push(game[player]);
        })
        formatedScores['Wins'].push(Math.max(...row));
    })


    players.forEach(player => {
        var temp = {};


        temp.average = Math.trunc(average(formatedScores[player])*1000)/1000;
        temp.max = max(formatedScores[player]);
        temp.min = min(formatedScores[player]);
        temp.stddev = Math.trunc(stdDev(formatedScores[player])*1000)/1000;
        temp.name = player;

        if(!Number.isNaN(temp.average))
        {
            formatedOutput.push(temp);
        }
    });
        var temp = {};
        temp.average = Math.trunc(average(formatedScores['Wins'])*1000)/1000;
        temp.max = max(formatedScores['Wins']);
        temp.min = min(formatedScores['Wins']);
        temp.stddev = Math.trunc(stdDev(formatedScores['Wins'])*1000)/1000;
        temp.name = 'Wins';
        formatedOutput.push(temp);











    return formatedOutput;

}







export default calculate