import { gql } from '@apollo/client';

// Mutation to add an adult
export const ADD_ADULT = gql`
mutation AddAdult($addAdultInput: AddAdultInput!) {
  addAdult(addAdultInput: $addAdultInput) {
    adultProfile {
      username
      email
      password
    }
    token
  }
}
`;

// Mutation to add a child
export const ADD_CHILD = gql`
mutation AddChild($addChildInput: AddChildInput!) {
  addChild(addChildInput: $addChildInput) {
    childProfile {
      username
      password
    }
    token
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
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
