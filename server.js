import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/typedefs'
import { resolvers } from './graphql/resolvers'
const winston = require('./config/winston');
import morgan from 'morgan';

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('combined', { stream: winston.stream }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.redirect('/graphql');
})

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}/graphql`)
)
