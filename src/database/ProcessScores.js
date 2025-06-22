






export function process(data){


    var formated = {};
    formated.scores = Array(data.length);
    formated.dates = Array(data.length);
    formated.game = Array(data.length);
    formated.scoringMode = Array(data.length);

    data.rows.forEach((row,index) => {
        formated.scores[index] = row.scores;
        
        formated.dates[index] = row.date;
        formated.game[index] = row.gameid;
        formated.scoringMode[index] = row.scoringMode;

     });
     return formated;
}

export default process;