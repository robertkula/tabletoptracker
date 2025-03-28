import * as calculateELO from "../../calculation/calculateELO.js"




export default function handler(req, res) {
  if (req.method === 'POST') {
    // Get the array from the request body
    const { numbers } = req.body;

    // Check if the input is an array
    if (!Array.isArray(numbers)) {
      return res.status(400).json({ error: 'Input must be an array' });
    }
    const scores = [...numbers];
const scoresOrdered = [...numbers];
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




    // Perform math operation (e.g., double each number)
    const modifiedArray = numbers.map(num => num * 2);

    // Return the modified array
    return res.status(200).json(postgameELO);
  } else {
    // If the method is not POST, return a 405 Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}




