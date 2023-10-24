import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_ANIMAL, QUERY_CHARC } from "../utils/queries";
import AnimalCard from "./AnimalCard";
import CharacteristicsCard from "./CharacteristicsCard";
import { DropdownMenu } from "./DropdownMenu";
import "../style/general.css";
import "../style/card.css";

export default function Concentration() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [randomAnimal, setRandomAnimal] = useState(null);
  const [randomCharacteristic, setRandomCharacteristic] = useState(null);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const {
    loading: animalLoading,
    error: animalError,
    data: animalData,
  } = useQuery(QUERY_ANIMAL);

  useEffect(() => {
    if (selectedValue && !animalLoading && !animalError) {
      const animals = animalData.animals;
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      setRandomAnimal(randomAnimal);
    }
  }, [selectedValue, animalData, animalLoading, animalError]);

  useEffect(() => {
    if (randomAnimal) {
      useLazyQuery(QUERY_CHARC, {
        variables: { id: randomAnimal._id },
        onCompleted: (data) => {
          if (data.findAnimal) {
            setRandomCharacteristic(data.findAnimal);
          }
        },
      });
    }
  }, [randomAnimal]);

  const canFlip = flippedCards.length < 2;

  const flipCard = (cardType) => {
    if (canFlip) {
      setFlippedCards([...flippedCards, cardType]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (
        firstCard === "animal" &&
        randomAnimal &&
        secondCard === "characteristic" &&
        randomCharacteristic &&
        randomAnimal.name === randomCharacteristic.name
      ) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);

        if (matchedCards.length === selectedValue * 2) {
          console.log("You've won!");
        }
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [
    flippedCards,
    matchedCards,
    selectedValue,
    randomAnimal,
    randomCharacteristic,
  ]);

  const isCardHidden = (cardType) => {
    return matchedCards.includes(cardType);
  };

  return (
    <div>
      <h1>Animal Concentration</h1>
      <h4>Instructions</h4>
      <p>
        Pick how many pairs of cards you would like to play with. Then click on
        one card at a time. Your goal is to match the animal to its
        characteristic. Example: you turn over a rabbit card, so you are looking
        for a rabbit characteristic as your second card. If you match them, they
        disappear, and you try again. You are working against the clock. See how
        fast you can match the different pairs.
      </p>
      <div className="dropDown">
        <DropdownMenu handleSelect={handleSelect} />
      </div>
      <div className="cardContainer">
        {selectedValue && (
          <div className="pair">
            <AnimalCard
              animalName={randomAnimal ? randomAnimal.name : ""}
              flipped={flippedCards.includes("animal")}
              hidden={isCardHidden("animal")}
              onClick={() => flipCard("animal")}
            />
            <CharacteristicsCard
              animalChar={randomCharacteristic ? randomCharacteristic : ""}
              flipped={flippedCards.includes("characteristic")}
              hidden={isCardHidden("characteristic")}
              onClick={() => flipCard("characteristic")}
            />
          </div>
        )}
      </div>
      {matchedCards.length === selectedValue * 2 && (
        <h2>You've Matched them All!</h2>
      )}
    </div>
  );
}
