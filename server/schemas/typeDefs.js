const typeDefs = `
type Child {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    grade: Int
    age: Int
    score: [Score]
}

type Adult {
    _id: ID
    username: String
    adultFirstName: String
    adultLastName: String
    email: String
    password: String
    subscribed: Boolean
    children: [Child]
}

type Auth {
    token: ID!
    adultProfile: Adult
    childProfile: Child
  }

type Language {
    _id: ID
    word: String
    phonetic: Boolean
    letterCount: Int
    clue: String
    digraph: Boolean
}

type Animal {
    _id: ID!
    animal: String!
    trophicLvl: String!
    habitat: String!
    class: String!
    locomotion: String!
    covering: String!
}

type Score {
    _id: ID!
    animal: [Int]
    language: [Int]
    math: [Int]
    last10AnimalScores: Int
    last10MathScores: Int
    last10LangScores: Int
}

input AddAdultInput {
    username: String!
    email: String!
    password: String!
}

input UpdateAdultInput {
    username: String
    adultFirstName: String
    adultLastName: String
    email: String
    password: String
    subscribed: Boolean
}

input AddChildInput {
    username: String!
    password: String!
}

input UpdateChildInput {
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    grade: Int
    age: Int
}


type Query {
    child(username: String!): Child
    words: [Language]
    adult(username: String!): Adult
    animals: [Animal]
    findAnimal(_id: ID!): Animal
    score(id: Int!): Score
 }

 type Mutation {
    addAdult(addAdultInput: AddAdultInput!): Auth
    addChild(addChildInput: AddChildInput!): Auth
    updateAdult(adultInput: UpdateAdultInput!): Adult
    updateChild(updateChildInput: UpdateChildInput!): Child
    login(email: String!, password: String!): Auth
    updateMathScore(username: String!, newMathScore: Int!): Child
} 
`;

module.exports = typeDefs;

//! type Input means args will be object within object
