import { gql } from '@apollo/client';

export const QUERY_ANIMAL = gql`
query Animal {
    animals {
      _id
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



