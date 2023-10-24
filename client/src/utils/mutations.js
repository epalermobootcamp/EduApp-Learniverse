import { gql } from '@apollo/client';

// Mutation to add an adult
export const ADD_ADULT = gql`
  mutation addAdult($username: String!, $email: String!, $password: String!) {
    addAdult(username: $username, email: $email, password: $password) {
      token
      adult {
        _id
        username
      }
    }
  }
`;

// Mutation to add a child
export const ADD_CHILD = gql`
  mutation addChild($username: String!, $password: String!) {
    addChild(username: $username, password: $password) {
      token
      child {
        _id
        username
      }
    }
  }
`;

// Mutation to update a child
export const UPDATE_CHILD = gql`
  mutation updateChild($username: String!, $firstName: String, $lastName: String, $email: String, $password: String!, $grade: Int, $age: Int) {
    updateChild(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password, grade: $grade, age: $age) {
      _id
      username
    }
  }
`;

// Mutation to update an adult
export const UPDATE_ADULT = gql`
  mutation updateAdult($username: String, $adultFirstName: String, $adultLastName: String, $email: String, $password: String, $subscribed: Boolean) {
    updateAdult(username: $username, adultFirstName: $adultFirstName, adultLastName: $adultLastName, email: $email, password: $password, subscribed: $subscribed) {
      _id
      username
  }
}
`;

// Mutation to update math score
export const UPDATE_MATH_SCORE = gql`
  mutation updateMathScore($newMathScore: Int!) {
    updateMathScore(newMathScore: $newMathScore) {
      _id
      username
      score
    }
  }
`;

// Mutation to login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
