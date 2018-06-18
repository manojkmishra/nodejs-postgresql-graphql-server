const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const books = [ // Some fake data
                    {    title: "Harry Potter and the Sorcerer's stone",   author: 'J.K. Rowling',  },
                    {    title: 'Jurassic Park',   author: 'Michael Crichton',  },
              ];
const typeDefs = ` type Query { books: [Book] }  type Book { title: String, author: String }`;  // The GraphQL schema in string form
const resolvers = {  Query: { books: () => books },};                         // The resolvers
const schema = makeExecutableSchema({  typeDefs,  resolvers,});               // Put together a schema
const app = express();                                                        // Initialize the app
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));           // The GraphQL endpoint
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));           // GraphiQL, a visual editor for queries
app.listen(3000, () => { console.log('Go to http://localhost:3000/graphiql to run queries!');});  // Start the server