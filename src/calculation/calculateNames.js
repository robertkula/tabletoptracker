
export function getNames(scores)
{   
    var seen = {};
    var output = Array();
    scores.forEach(game =>{
        Object.keys(game).forEach(name => {
            
            if(!seen[name])
            {
                output.push(name);
                seen[name] = true;
            }


        });
    });

    return output;

}




export default getNames;