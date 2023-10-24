import React from "react";
import Card from "../components/Card";

export default function CharacteristicsCard(props) {
  const { animalChar, flipped, onClick } = props;

  return (
    <Card className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      {flipped ? animalChar : "Click to flip"}
    </Card>
  );
}
