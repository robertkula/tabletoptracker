import Papa from 'papaparse';


export function readScores(inputCSV)
{
    const finishedArray =  Array(inputCSV.length);
    finishedArray = [...inputCSV[0]];
    console.log(finishedArray);






}

export function readELO(inputCSV)
{
if (inputCSV) {
      Papa.parse(inputCSV, {
        complete: (result) => {
          return(result.data[0]); // First row is headers

        },
      });
    }
}




// readScores(newData);

