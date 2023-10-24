import "../style/card.css";
import "../style/general.css";

export default function Card({ title }) {
  return (
    <div className="card">
      <h1 className="cardTitle">{title}</h1>
    </div>
  );
}
