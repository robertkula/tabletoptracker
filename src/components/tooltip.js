const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { date, x } = payload[0].payload;
  return (
    
    <div style={{ background: '#111', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>Score:</strong> {payload[1].payload.y}</p>
        <p><strong>Game:</strong> {x + 1}</p>
        <p><strong>Date:</strong> {date}</p>

    </div>
  );
};

export default CustomTooltip;
