import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";

const app = express() as Application;

// Enable CORS
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({
    app: app as any,
    cors: {
      origin: "*", // Allow all origins or specify frontend URL (e.g., http://localhost:5173)
      credentials: true
    }
  });

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
}

startServer();
