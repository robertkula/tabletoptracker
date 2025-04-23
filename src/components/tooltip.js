const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
  
    const date = payload[0].payload?.date;

    return (
      <div style={{ background: '#111', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>Date:</strong> {date}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color, margin: 0 }}>
            <strong>{entry.name}</strong>: {entry.value}
          </p>
        ))}
      </div>
    );
  };
  
export default CustomTooltip;  