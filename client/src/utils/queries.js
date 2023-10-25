import { gql } from '@apollo/client';

export const QUERY_ADULT = gql`
  query singleAdult($username: String!) {
    adult(username: $username) {
      _id
      username
      adultFirstName
      adultLastName
      email
      subscribed
      children {
        _id
        username
        firstName
        lastName
        email
        grade
        age
        score {
          _id
          animal
          language
          math
          last10ScienceScores
          last10MathScores
          last10LangScores
        }
      }
    }
  }
`;

export const QUERY_CHILD = gql`
  query singleChild($username: String!) {
    child(username: $username) {
      _id
      username
      firstName
      lastName
      email
      grade
      age
      score {
        _id
        animal
        language
        math
        last10ScienceScores
        last10MathScores
        last10LangScores
      }
    }
  }
`;

export const QUERY_SCORE = gql`
  query singleScore($username: String!) {
    score(username: $username) {
      _id
      animal
      language
      math
      last10ScienceScores
      last10MathScores
      last10LangScores
    }
  }
`;

export const QUERY_WORDS = gql`
  query words {
    words {
      _id
      word
      phonetic
      letterCount
      clue
      digraph
    }
  }
`;

export const QUERY_ANIMAL = gql`
query Animal {
    animals {
      _id
      animal
    }
  }
`;

export const QUERY_CHARC = gql`
query AnimalsChar($id: ID!) {
    findAnimal(_id: $id) {
      class
      covering
      habitat
      locomotion
      trophicLvl
    }
  }
`
