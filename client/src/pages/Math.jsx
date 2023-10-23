import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { rollDice, getRandomOperator, calculateAnswer } from '../utils/math';

const Math = () => {
  const [diceRollOne, setDiceRollOne] = useState(1);
  const [diceRollTwo, setDiceRollTwo] = useState(1);
  const [randomOperator, setRandomOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);

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
  };

  return (
    <div className="App">
      <h1>Math Game</h1>
      <div>
        <button onClick={handleRollDice}>Roll Dice</button>
        <p>
          {diceRollOne} {randomOperator} {diceRollTwo} = ?
        </p>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleCalculateAnswer}>Check Answer</button>
        {correctAnswer !== null && (
          <p>
            {userAnswer == correctAnswer ? 'Correct!' : 'Try again.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Math;
