const typeDefs = `
  # Book is embedded in User as saved books
  type Book {
    _id: ID
    bookId: String!
    title: String!
    description: String!
    authors: [String]
    image: String
    link: String
  }

  # User with saved Books
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Set up an Auth type to handle returning data from login or user creation
  type Auth {
    token: ID!
    user: User
  }

  # convenience for saveBook mutation
  input BookData {
    bookId: String!
    title: String!
    description: String!
    authors: [String]
    image: String
    link: String
  }

  # "display all users" is not needed for production but useful in development
  type Query {
    users: [User]
    me(id: ID, username: String): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookData): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
