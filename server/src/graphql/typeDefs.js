const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        siteWeb: String
        description: String
        password: String!
        avatar: String
        createAt: String
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        getUser(username: String!): User
    }

    type Mutation {
        register(user: UserInput!): User!
        login(user: LoginInput!): Token
    }
`;

module.exports = typeDefs;