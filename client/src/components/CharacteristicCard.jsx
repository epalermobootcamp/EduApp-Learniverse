import React, {useState} from "react";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_CHARC } from "../utils/queries";

const ATTRIBUTE_OPTIONS = [
  "class", 
  "covering",
  "habitat",
  "locomotion",
  "trophicLvl"
];
export default function CharacteristicCard(props) {
  const { animalId, success, flipped, onClick } = props;
  const [attributeToLoad] = useState(ATTRIBUTE_OPTIONS[Math.floor(Math.random()*ATTRIBUTE_OPTIONS.length)]);

  const {data:characteristicData, loading, error} = useQuery(QUERY_CHARC, {
    variables: { id: animalId},
  });

  if (loading) {
    return (
    <Card className={`card `} title={"Loading"} >
      
    </Card>);
  }
  if (error) {
    return (
    <Card className={`card `} title={"Error"}>
      
    </Card>);
  }
  const characteristicName = characteristicData.findAnimal[attributeToLoad]
  return (
    <Card className={`card ${flipped ? "flipped" : ""}`} onClick={onClick} title={success? `✓ ${characteristicName} ✓`: flipped ? characteristicName : "Click to flip"}>
      
    </Card>
  );
}
