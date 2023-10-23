const typeDefs = `
type Child {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    password: String!
    grade: Int
    age: Int
    score: [Score]
}

type Language {
    _id: ID!
    word: String!
    phonetic: Boolean!
    letterCount: Int!
    clue: String!
    digraph: Boolean!
}

type Parent {
    _id: ID!
    username: String!
    parentFirstName: String!
    parentLastName: String!
    email: String!
    password: String!
    subscribed: Boolean!
    children: [Child]
}

type Animal {
    _id: ID!
    trophicLvl: String!
    habitat: String!
    class: String!
    locomotion: String!
    covering: String!
}

type Score {
    _id: ID!
    science: [Number]
    language: [Number]
    math: [Number]
    last10ScienceScores: Int
    last10MathScores: Int
    last10LangScores: Int
}

type Query {
    child(id: String!): Child
    words: [Language]
    parent(id: String!): Parent
    animals: [Animal]
    score(id: Int!): Score
}

type Mutation {
    addUser(userInput: UserInput!): User
    addParent(parentInput: ParentInput!): Auth
    addChild(addChildInput: AddChildInput!): Auth
    updateParent(parentInput: ParentInput!): Parent
    updateChild(updateChildInput: UpdateChildInput!): Child
    login(email: String!, password: String!): Auth
    createCardMatch()
}

input ParentInput {
    username: String!
    parentFirstName: String!
    parentLastName: String!
    email: String!
    password: String!
    subscribed: Boolean!
}

input AddChildInput {
    username: String!
    password: String!
}

input UpdateChildInput {
    username: String!
    firstName: String
    lastName: String
    email: String
    password: String!
    grade: Int
    age: Int
}

input UserInput {
    username: String!
    isParent: Boolean!
    id: String!
}
`;

module.exports = typeDefs;
 //sign-up returns account document and token
 //! Line 66 Auth = document + token

 //Query.child = for a child to query their own score data
//Query.words = for word game to query array of words to spell (filtered based on game settings)
//Query.parent = for parent to query their children and their scores
//Query.animals = for science game to query array of animals to render cards (filtered based on game settings)
//!Query.score = I can't think of a reason for this one.

//Mutation.addUser = to create user document when either type of account signs up to ensure ID uniqueness is inter-model.
//Mutation.addParent = for parent account sign up
//Mutation.addChild = for child account sign up
//Mutation.updateParent = for parents to update their info
//Mutation.updateChild = for parents to update children's info
//Mutation.login = for any account to log in
//! mutation.createCardMatch = Not sure. No args implemented here.