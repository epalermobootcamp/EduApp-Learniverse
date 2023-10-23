function rollDice() {
    const randomNumber = Math.random();

    const min = 1;
    const max = 6;
    const roll = Math.floor(randomNumber * (max - min + 1)) + min;

    return roll;
}

function getRandomOperator() {
    const randomNum = Math.random();
  
    if (randomNum < 1 / 3) {
      return '+';
    } else if (randomNum < 2 / 3) {
      return '-';
    } else {
      return '*';
    }
  }

function calculateAnswer(diceOne, diceTwo, operator) {
    if (operator === '+') {
        return diceOne + diceTwo;
      } else if (operator === '-') {
        return diceOne - diceTwo;
      } else if (operator === '*') {
        return diceOne * diceTwo;
      } else {
        return "Invalid operator"; // Handle the case of an invalid operator
      }
}

const diceRollOne = rollDice();
const diceRollTwo = rollDice();
const randomOperator = getRandomOperator();
const correctAnswer = calculateAnswer(diceRollOne, diceRollTwo, randomOperator)

console.log(diceRollOne, " ", randomOperator, " ", diceRollTwo, " = ", correctAnswer)
