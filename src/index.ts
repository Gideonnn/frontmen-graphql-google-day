import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import casual from 'casual';

import { User } from './schema/generated';

const typeDefs = require('./schema/schema.graphql');

const start = async () => {
  await mongoose.connect(
    'mongodb://localhost/graphql',
    { useNewUrlParser: true }
  );

  const UserModel = mongoose.model('User', {
    id: String,
    firstname: String,
    lastname: String,
    age: Number,
  });

  const db = await mongoose.connect(
    'mongodb://localhost/graphql',
    { useNewUrlParser: true }
  );

  const resolvers = {
    Query: {
      users: async () => await UserModel.find(),
    },
  };

  const mocks = {
    User: () => ({
      id: () => casual.string,
      firstname: () => casual.first_name,
      lastname: () => casual.last_name,
      age: () => casual.integer(0, 100),
    }),
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // mocks,
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
