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
    _id: ID
    trophicLvl: String
    habitat: String
    class: String
    locomotion: String
    covering: String
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
//sign-up returns account document and token

//Query.child = for a child to query their own score data
//Query.words = for word game to query array of words to spell (filtered based on game settings)
//Query.parent = for parent to query their children and their scores
//Query.animals = for animal game to query array of animals to render cards (filtered based on game settings)
//!Query.score = I can't think of a reason for this one.

//Mutation.addParent = for parent account sign up
//Mutation.addChild = for child account sign up
//Mutation.updateParent = for parents to update their info
//Mutation.updateChild = for parents to update children's info
//Mutation.login = for any account to log in
//! mutation.createCardMatch = Not sure. No args implemented here.
