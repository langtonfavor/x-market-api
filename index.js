const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const { MONGO_DB } = require("./config");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGO_DB, { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running on: ${res.url}`);
  });
