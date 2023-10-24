import { gql } from '@apollo/client';

const QUERY_ADULT = gql`
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