import * as calculateELO from "../../calculation/calculateELO.js"



export default function handler(req, res) {
    if (req.method === 'POST') {
      // Get the arrays from the request body
      const { array1, array2 } = req.body;
  
      // Check if both are arrays
      if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return res.status(400).json({ error: 'Both inputs must be arrays' });
      }
  
      // Check if both arrays are of the same length
      if (array1.length !== array2.length) {
        return res.status(400).json({ error: 'Both arrays must have the same length' });
      }
  
      // Perform math operation (e.g., sum corresponding elements)
      const result = array1.map((num, index) => num + array2[index]);
    const scores = [...array1];
    const scoresOrdered = [...array1];
    scoresOrdered.sort().reverse();
    const length = scores.length;
    const outcomes = calculateELO.calculateOutcomes(scoresOrdered);
    const realOutcomes = calculateELO.calculateRealOutcomes(scoresOrdered,outcomes);
    const realOutcomesOrdered = calculateELO.orderRealOutcomes(scores,scoresOrdered,realOutcomes);
    const pregameELO = [...array2];
  
    const postgameELO = calculateELO.calculateELO(pregameELO,realOutcomesOrdered);
  


      
      // Return the result
      return res.status(200).json(postgameELO);
    } else {
      // If the method is not POST, return a 405 Method Not Allowed
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  