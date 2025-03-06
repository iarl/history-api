import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import path from "path";
import jwt from "jsonwebtoken";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { connectDB } from "./db";

async function startServer() {
  connectDB();

  const app = express();
  const httpServer = createServer(app);

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token.replace("Bearer ", ""));
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  const getUserFromToken = (token: string | null) => {
    if (!token) return null;
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return null;
    }
  };
  

  // Serve SpectaQL docs from /docs
  const docsPath = path.join(__dirname, "..", "docs"); // Adjust if needed
  app.use("/docs", express.static(docsPath));

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📄 Docs available at http://localhost:${PORT}/docs`);
  });
}

startServer();
