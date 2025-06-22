







export function format(scores,dates,players)
{
   
  var averages = Array();
    var formated = Object.fromEntries(players.map(key => [key, Array()]));
    formated['Average'] = Array();
// console.log("FORMATED",formated)
    scores.forEach(row =>{
        const values = Object.values(row);
        const sum = values.reduce((acc, val) => acc + val, 0);  // 6
        averages.push(sum / values.length); 

    });
    scores.forEach((row, index) => {
        for (const [player, score] of Object.entries(row)) {
          if (!formated[player]) {
            formated[player] = [];
          }
          formated[player].push({ x: index, y: score, date: dates[index] });
        }
        // console.log(row);
        formated['Average'].push({x:index, y: averages[index], date: dates[index]});

      });
      players.forEach(player =>{
        if(formated[player].length === 0 )
        {

            delete formated[player];
        }
      });
      // console.log("FORMATED",formated)

      return formated;
}

export default format;