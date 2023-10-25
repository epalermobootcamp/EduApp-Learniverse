import React from "react";
import Card from "../components/Card";

export default function AnimalCard(props) {
  const { animalName, success, flipped, onClick } = props;
  
  return (
    <Card className={`card ${flipped ? "flipped" : ""}`} onClick={onClick} title={success?`✓ ${animalName} ✓`: flipped ? animalName : "Click to flip"}>
      
    </Card>
  );
}
