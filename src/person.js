import * as calculateELO from './calculation/calculateELO.js'


  
  



const data = [3,6,4,6,2]



const scores = [...data];
const scoresOrdered = [...data];
scoresOrdered.sort().reverse();
const length = data.length;
const outcomes = calculateELO.calculateOutcomes(scoresOrdered);
const realOutcomes = calculateELO.calculateRealOutcomes(scoresOrdered,outcomes);
const realOutcomesOrdered = calculateELO.orderRealOutcomes(scores,scoresOrdered,realOutcomes);
const pregameELO = [1000,1100,900,950,1150];

const postgameELO = calculateELO.calculateELO(pregameELO,realOutcomesOrdered);

console.log(pregameELO);
console.log(realOutcomes);
console.log(postgameELO);












  // Create an instance of the class





  
