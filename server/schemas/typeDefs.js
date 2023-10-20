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
    child(id: Int!): [Child]
    words: [Language]
    parent(id: Int!): [Parent]
    animals: [Animal]
    score(id: Int!): [Score]
}

type Mutation {
    addParent(parentInput: ParentInput!): Parent
    addChild(addChildInput: AddChildInput!): Child
    updateChild(updateChildInput: UpdateChildInput): Child
}

input ParentInput {
    username: String!
    parentFirstName: String!
    parentLastName: String!
    email: String!
    password: String!
    subscribed: Boolean
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
