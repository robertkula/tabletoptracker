






export function process(data){


    // console.log(data.rows);
    var formated = {};
    formated.players = data.rows[0].players;
    formated.games = data.rows[0].games;
    formated.start = data.rows[0].date;

     return formated;
}

export default process;