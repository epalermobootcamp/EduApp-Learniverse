import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { rollDice, getRandomOperator, calculateAnswer } from "../utils/math";
import AuthService from "../utils/auth";
import { UPDATE_MATH_SCORE } from '../utils/mutations';
import ('../style/general.css');
import ('../style/card.css');


const Math = () => {
  const [diceRollOne, setDiceRollOne] = useState(1);
  const [diceRollTwo, setDiceRollTwo] = useState(1);
  const [randomOperator, setRandomOperator] = useState("+");
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [updateMathScore] = useMutation(UPDATE_MATH_SCORE);
  
  const handleRollDice = () => {
    const newDiceRollOne = rollDice();
    const newDiceRollTwo = rollDice();
    const newRandomOperator = getRandomOperator();

    setDiceRollOne(newDiceRollOne);
    setDiceRollTwo(newDiceRollTwo);
    setRandomOperator(newRandomOperator);
    setCorrectAnswer(null);
  };

  const handleCalculateAnswer = () => {
    const answer = calculateAnswer(diceRollOne, diceRollTwo, randomOperator);
    setCorrectAnswer(answer);

    // Assuming userAnswer is the user's input and correctAnswer is the expected answer
    const userIsCorrect = userAnswer == correctAnswer;

    // Calculate the score (1 for correct, 0 for incorrect)
    const newScore = userIsCorrect ? 1 : 0;

    // Get the user's username from the JWT using AuthService
    const username = AuthService.getProfile().username;

    // Update the user's score in the database using the mutation
    updateMathScore({
      variables: {
        username: username,
        newMathScore: newScore,
      },
    }).catch((error) => {
      console.error("Failed to update math score:", error);
    });
  };

  return (
    <div className="mathGame">
      <h1 className="conc">Math Game</h1>
      <div>
        <button onClick={handleRollDice}>Roll Dice</button>
        <h3>
          {diceRollOne} {randomOperator} {diceRollTwo} = ?
        </h3>
        <input
        className="math"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleCalculateAnswer}>Check Answer</button>
        {correctAnswer !== null && (
          <p>{userAnswer == correctAnswer ? "Correct!" : "Try again."}</p>
        )}
      </div>
    </div>
  );
};

export default Math;

// Get profile token from local storage.
// In the token will be a profile w/ username or email etc...
// Use a mutation with username and new score, new resolver, find the DB document with username, and update the child.score.math array.
// One function can do everything
// Use template literal OR if-else statement.
