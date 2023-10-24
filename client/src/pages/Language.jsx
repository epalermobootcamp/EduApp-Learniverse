import React, { Component } from "react";
import { render } from "react-dom";
import "../style/language.css";

function getWord() {
  return "independent";
}

function getRemainingGuess() {
  return 5;
}

class App extends Component {
  state = {
    word: getWord().toLowerCase().split(""),
    originalWord: getWord().split(""),
    remainingGuesses: getRemainingGuess(),
    guessList: [],
    status: "Playing",
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeyPress);
  }

  setStatus = () => {
    const finished = this.state.word.every((letter) => {
      return this.state.guessList.includes(letter) || letter == " ";
    });

    let stateVal = "";
    if (this.state.remainingGuesses === 0) {
      stateVal = "Failed";
    } else if (finished) {
      stateVal = "Success";
    } else {
      stateVal = "Playing";
    }

    this.setState({
      status: stateVal,
    });
  };

  getStatusMessage = () => {
    if (this.state.status === "Playing") {
      return <h3>Guesses Remaining : {this.state.remainingGuesses}</h3>;
    } else if (this.state.status === "Failed") {
      return <h3>Nice try, the word was {this.state.originalWord.join("")}</h3>;
    } else {
      return <h3>Great job! You guessed the word</h3>;
    }
  };

  hint = () => {
    if (this.state.status !== "Playing") {
      return null; // Return null if hint is not applicable
    }

    return (
      <h3>
        Hint : This word means free from outside control; not depending on
        another's authority
      </h3>
    );
  };

  getPuzzle = () => {
    if (this.state.status !== "Playing") {
      return null; // Return null if puzzle is not applicable
    }

    let puzzle = "";
    this.state.originalWord.forEach((letter) => {
      puzzle +=
        this.state.guessList.includes(letter.toLowerCase()) || letter === " "
          ? letter
          : "*";
    });

    return <h3>{puzzle}</h3>;
  };

  makeGuess = (letter) => {
    if (this.state.status !== "Playing") {
      return;
    }
    const guessedAlready = this.state.guessList.includes(letter.toLowerCase());

    if (letter.length > 0 && letter !== " " && !guessedAlready) {
      const arr = this.state.guessList.slice(); // Create a new array to update state

      arr.push(letter.toLowerCase());

      this.setState({
        guessList: arr,
      });

      const correctGuess = this.state.word.includes(letter.toLowerCase());

      if (!correctGuess) {
        this.setState({
          remainingGuesses: this.state.remainingGuesses - 1,
        });
      }
    }

    this.setStatus();
  };

  handleKeyPress = (event) => {
    this.makeGuess(event.key);
  };

  render() {
    return (
      <div>
        {this.state.status === "Playing" ? (
          <h1>GUESS IT (Press any key)</h1>
        ) : this.state.status === "Success" ? (
          <h1>YOU GUESSED IT!</h1>
        ) : (
          <h1>OH NO!</h1>
        )}
        {this.hint()}
        {this.getPuzzle()}
        {this.getStatusMessage()}
        <button
          onClick={() => {
            this.setState({
              word: getWord().toLowerCase().split(""),
              originalWord: getWord().split(""),
              remainingGuesses: getRemainingGuess(),
              guessList: [],
              status: "Playing",
            });
          }}
        >
          Play Again
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
