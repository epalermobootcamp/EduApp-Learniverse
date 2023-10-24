import React from "react";
import Card from "../components/Card";

export default function AnimalCard(props) {
  const { animalName, flipped, onClick } = props;

  return (
    <Card className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      {flipped ? animalName : "Click to flip"}
    </Card>
  );
}
