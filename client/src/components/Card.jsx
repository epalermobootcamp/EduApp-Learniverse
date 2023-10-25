import "../style/card.css";
import "../style/general.css";

export default function Card({ title, onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <h1 className="cardTitle">{title}</h1>
    </div>
  );
}
