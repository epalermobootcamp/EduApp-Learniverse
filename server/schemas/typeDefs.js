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
    subscribed: Boolean
    children: [Children]
}

type Animal {
    _id: ID!
    trophicLvl: String!
    habitat: String!
    class: String!
    locomotion: String!
    covering: String!
}

//! Must include the virtuals to allow client to request these computed values when querying Score objects.
type Score {
    _id: ID!
    science: [Number]
    language: [Number]
    math: [Number]
    last10ScienceScores: Int
    last10MathScores: Int
    last10LangScores: Int
}
`