import Papa from 'papaparse';


export function readScores(inputCSV)
{
    const finishedArray =  Array(inputCSV.length);
    finishedArray = [...inputCSV[0]];
    console.log(finishedArray);






}

export function readELO(inputArray)
{
  var ELO = [inputArray[2],inputArray[4],inputArray[6]];


  return ELO;
}




// readScores(newData);

