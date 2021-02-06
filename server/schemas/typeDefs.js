const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    },

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        author: Array
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookInfo: BookInput): User
        removeBook(bookId): User
    }
`;  

module.exports = typeDefs;