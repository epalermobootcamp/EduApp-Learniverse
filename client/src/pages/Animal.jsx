import React, { useState, useCallback, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ANIMAL } from "../utils/queries";
import AnimalCard from "../components/AnimalCard";
import CharacteristicCard from "../components/CharacteristicCard";
import {DropdownMenu} from "../components/DropdownMenu";

import "bootstrap/dist/css/bootstrap.min.css"
import "../style/general.css";
import "../style/card.css";


const createShuffleOrder = (numberOfItems) => {
  const shuffleMap = []
  for (let i=0; i<numberOfItems; i++){
    const newPosition = Math.floor(Math.random()*shuffleMap.length);
    shuffleMap.splice(newPosition, 0, i);
  }
  return shuffleMap; // every index is represented once but in a random position
}

export default function Concentration() {
  //const [selectedValue, setSelectedValue] = useState(null);
  const selectedValue = 4;
  const [randomAnimals, setRandomAnimals] = useState(null);

  //const [flippedAnimalId, setFlippedAnimalId] = useState(null);
  //const [flippedCharacteristicAnimalId, setFlippedCharacteristicAnimalId] = useState
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [shuffleOrder] = useState(createShuffleOrder(8));

  // const handleSelect = (value) => {
  //   setSelectedValue(value);
  // };

  const {
    loading: animalLoading,
    error: animalError,
    data: animalData,
  } = useQuery(QUERY_ANIMAL);

  const isAlreadyMatched = useCallback((id) => {
    return matchedCards.some((matchedCardId)=>{
      return (matchedCardId === id);      
    })
   
  }, [matchedCards]);
  const flipCard = useCallback(({type, id}) => {
    const countBeforeFlip = flippedCards.length;
    console.log(`Flipped count is ${countBeforeFlip}`);
    //TODO: clickig the same card twice is not handled
    if ((countBeforeFlip < 2) && (!isAlreadyMatched(id)) ) {
      setFlippedCards([...flippedCards, {type, id}]);
    }
    if (countBeforeFlip == 1) {
      const firstFlipId = flippedCards[0].id
      if (firstFlipId === id) // found a match
      {
        console.log("Found match")
        setMatchedCards([...matchedCards, id]);
      }
    }

  }, [flippedCards, matchedCards]);
  const shouldShowFlipped = useCallback(({type, id}) => {
    return flippedCards.some((flippedCard)=>{
      return (type === flippedCard.type) && (id === flippedCard.id);
    })
   
  }, [flippedCards]);


  const handleNext = useCallback(()=>{
    setFlippedCards([])
  });

  if (animalLoading){
    return (<div>Loading</div>);
  }

  if (animalError){
    return (<div>Error</div>);
  }
  let animalsToRender = null;
  if (randomAnimals === null){
    const remainingAnimals = [...animalData.animals];
    const randomAnimalArray = [];
    for (let i=0; i<selectedValue; i++)
    {
      const selectedIndex = Math.floor(Math.random() * remainingAnimals.length)
      const randomAnimal = remainingAnimals[selectedIndex];
      remainingAnimals.splice(selectedIndex, 1); //removes the animal so it is not used twice
      randomAnimalArray.push(randomAnimal);
    }

    setRandomAnimals(randomAnimalArray);
    animalsToRender = randomAnimalArray;
  }
  else {
    animalsToRender = randomAnimals;
  }


  
  const animalCards = animalsToRender.map((animal) => {
    return (       
    <AnimalCard
      key={`animal-${animal._id}`}
      animalName={animal.animal}
      flipped={ shouldShowFlipped({type: 'animal', id:animal._id})}
      success={ isAlreadyMatched(animal._id) }
      onClick={() => flipCard({type:'animal', id:animal._id})}
    />
    );
  });

  const characteristicCards = animalsToRender.map((animal) => {
    return (       
    <CharacteristicCard
      key={`characteristic-${animal._id}`}
      animalId={animal._id}
      flipped={ shouldShowFlipped({type: 'characteristic', id:animal._id})}
      success={ isAlreadyMatched(animal._id)}
      onClick={() => {
        console.log("Flipping")
        flipCard({type:'characteristic', id:animal._id})
      }}
    />
    );
  });

  const allCards = animalCards.concat(characteristicCards);


  const allCardsShuffled = allCards.map((value, index, array)=>{
    return array[shuffleOrder[index]];

  })
  const startOfSecondHalf = Math.floor(allCardsShuffled.length/2);

  const firstColumn = allCardsShuffled.slice(0,startOfSecondHalf);
  const secondColumn = allCardsShuffled.slice(startOfSecondHalf, allCardsShuffled.length)


  return (
    <div>
      <h1 className="conc">Animal Concentration</h1>
      <h4 className="conc">Instructions</h4>
      <p className="conc">
        Your goal is to match the animal to its characteristic. Example: you turn over a rabbit card, so you are looking
        for a rabbit characteristic as your second card such as has fur. If you match them, they
        show a checkmark. To take your next turn click "next" button. 
      </p>
      {/* <div className="dropDown">
        <DropdownMenu handleSelect={handleSelect} />
      </div> */}
      <button className= "next" disabled={flippedCards.length <2} onClick={handleNext}>Next</button>
      <div className="concentration-board">
        <div className="concentration-board-column" >
         {firstColumn}
        </div>  
        <div className="concentration-board-column" >
         {secondColumn}
        </div>
      </div>
      {matchedCards.length === selectedValue && (
        <h2 className="conc">You've Matched them All!</h2>
      )}
    </div>
  );
}
