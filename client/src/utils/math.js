export function rollDice() {
  const randomNumber = Math.random();

  const min = 1;
  const max = 6;
  const roll = Math.floor(randomNumber * (max - min + 1)) + min;

  return roll;
}

export function getRandomOperator() {
  const randomNum = Math.random();

  if (randomNum < 1 / 3) {
    return "+";
  } else if (randomNum < 2 / 3) {
    return "-";
  } else {
    return "*";
  }
}

export function calculateAnswer(diceOne, diceTwo, operator) {
  if (operator === "+") {
    return diceOne + diceTwo;
  } else if (operator === "-") {
    if (diceOne < diceTwo) {
      // Swap the values to ensure the larger one is subtracted from the smaller one
      [diceOne, diceTwo] = [diceTwo, diceOne];
    }
    return diceOne - diceTwo;
  } else if (operator === "*") {
    return diceOne * diceTwo;
  } else {
    return "Invalid operator"; // Handle the case of an invalid operator
  }
}

let diceRollOne = rollDice();
let diceRollTwo = rollDice();
const randomOperator = getRandomOperator();
if (randomOperator === "-" && diceRollOne < diceRollTwo) {
    // Swap the values to ensure the larger one is subtracted from the smaller one
    [diceRollOne, diceRollTwo] = [diceRollTwo, diceRollOne];
  }
  export const correctAnswer = calculateAnswer(diceRollOne, diceRollTwo, randomOperator);

console.log(
  "Random Math Problem :",  
  diceRollOne,
  " ",
  randomOperator,
  " ",
  diceRollTwo,
  " = ",
  correctAnswer
);