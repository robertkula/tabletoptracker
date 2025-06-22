import React from 'react';
import LineChartComponent from './ChartComponent'; // Make sure the path is correct
import ScoresScatterChart from './scatterPlot2'; // Make sure the path is correct
import TableComponent from './TableComponent'; // Make sure the path is correct

const ChartRenderer = ({ datasets }) => {
  if(datasets.length !== 0){
  console.log("DATAESTS",datasets);
    
  return (
    <div>
      {

<LineChartComponent
              data={datasets['elo']}
              names={datasets['names']}

            />

      }
      {Object.keys(datasets.games).map((game) => (
        <div key={game} style={{ marginBottom: '3rem' }}>
          {/* Game Title */}
          <h3 style={{ marginBottom: '1rem' }}>{game}</h3>
  
          {/* LineChartComponent: Full width */}
          <div style={{ marginBottom: '2rem' }}>
            <LineChartComponent
              data={datasets['games'][game].elo}
              names={datasets['games'][game].names}

            />
          </div>
  
          {/* ScatterPlot and TableComponent: Side by side */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 3 }}>
              <ScoresScatterChart
                data={datasets['games'][game].scores}
                gameDates={datasets['games'][game].dates}
              />
            </div>
            <div style={{ flex: 2 }}>
              <TableComponent data={datasets['games'][game].table} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  };
  


  // return (
      
  //   <div>
      
  //     {Object.keys(datasets).map((game) => (
  //       <div key={game} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
  //         <p4> {game} </p4>
  //         <LineChartComponent data={datasets[game].elo} names={Object.keys(datasets[game].scores)}/>
  //         <ScoresScatterChart data={datasets[game].scores} gameDates={datasets[game].dates} />
  //         <TableComponent data={datasets[game].table}/>
  //       </div>
        
  //     ))}
  //   </div>
  // );
};

export default ChartRenderer;
