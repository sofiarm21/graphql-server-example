const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    type Book {
        title: String,
        year: Int
    }

    type Author {
        name: String,
        country: String
        books: [Book]
    }

    type User {
        id: ID!
        name: String!
        email: String!
    }

    type UpdateUserEmailMutationResponse implements MutationResponse {
        code: String!
        success: Boolean!
        message: String!
        user: User
    }

    type UpdateBookMutationResponse {
        code: String!
        success: Boolean!
        message: String!
        title: String
        year: Int
    }

    type Query {
        books: [Book]
        authors: [Author]
    }

    type Mutation {
       addBook(title: String, year: Int): UpdateBookMutationResponse
       updateUserEmail(id: ID!, email: String!): UpdateUserEmailMutationResponse
    }

    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
}
`

const books = [
  {
    title: 'The Awakening',
    year: 2010,

  },
  {
    title: 'City of Glass',
    year: 2010,

  },
];

const authors = [
    {
        name: 'Adam',
        country: 'UK'
    },
    {
        name: 'Sofia',
        country: 'Venezuela'
    },
    {
        name: 'Ricardo',
        country: 'Spain'
    },
    {
        name: 'Ashley',
        country: 'US'
    },

]

const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors
    },
    Mutation: {
         async addBook (_, {title, year}) {
            return books.push({
                title: title,
                year: year
            })
        },
    }
}



const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
