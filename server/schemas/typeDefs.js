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
    updateChild(updateChildInput: UpdateChildInput!): Child
    updateParent(parentInput: ParentInput!): Parent
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

//! Query for Score may be redundant because queries for Child should populate Score already.
//Query child document by ID. If a parent document has multiple children it will query them one at a time by ID.
//Query all word documents then filter a new array based on game settings? Then choose randomlly based on filtered array.
//Query parent document by ID.
//Query all animal documents. (Maybe filter which fields are included based on game settings? Logic to use fields done client side?)
//Query score document by ID. Each child document hasOne score document.
//Add parent document. ParentInput has all fields required.
//Add child document. If a child makes an account on their own only username and password is expected.
//Update child document. A parent can choose to fill in their child's data so the input includes non-required fields.