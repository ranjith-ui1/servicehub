

function DashboardCard(props) {
  return (
    <div
      className="dashboard-card"
      style={{ borderTop: `6px solid ${props.color}` }}
    >
      <h2>{props.title}</h2>

      <h1>{props.value}</h1>
    </div>
  );
}

export default DashboardCard;