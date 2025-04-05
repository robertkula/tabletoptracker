const myTitle = "Chart Overview";
const myData = [1,2,3,4,56];
import twoParamChart from '../components/twoParam';
import LineChartComponent from '../components/ChartComponent';


const App = () => {

  return(
    <div>
      <h1>ELO</h1>
      <LineChartComponent data={myData} />
      
    </div>
)
}
export default App;
