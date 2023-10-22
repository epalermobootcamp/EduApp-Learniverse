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
    addParent(parentInput: ParentInput!): Auth
    addChild(addChildInput: AddChildInput!): Auth
    updateParent(parentInput: ParentInput!): Parent
    updateChild(updateChildInput: UpdateChildInput!): Child
    login(email: String!, password: String!): Auth
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
`;

 //sign-up returns account document and token
 //! Line 66 Auth = document + token

//Query.child = for a child to query their own score data
//Query.words = for word game to query array of words to spell (filtered based on game settings)
//Query.parent = for parent to query their children and their scores
//Query.animals = for science game to query array of animals to render cards (filtered based on game settings)
//!Query.score = I can't think of a reason for this one.

//Mutation.addParent = 
//Mutation.addChild =
//Mutation.updateParent =
//Mutation.updateChild =
//Mutation.login =
