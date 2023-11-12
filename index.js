import { config } from "dotenv";
config();
import { resolve } from "path";
import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connect } from "mongoose";
import models from "./models.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import router from "./routes/index.js";
import schema from "./graphql/index.js";

const app = express();

app.set("env", "production");
app.set("view engine", "ejs");
app.set("views", resolve("./static/views"));
app.use("/", router);

const httpServer = createServer(app);
const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await apolloServer.start();

app.use(
  "/api",
  cors(),
  json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      let result = {
        models,
      };
      const token =
        req.headers.authorization?.split(" ")[1] ||
        req.headers.Authorization?.split(" ")[1] ||
        "";
      if (token) {
        try {
          const { id, role } = jwt.verify(token, process.env.ACCESS_TOKEN);
          result = { ...result, user: { id, role } };
        } catch (err) {}
      }
      return result;
    },
  })
);

await connect(process.env.DB);
await new Promise((resolve, reject) =>
  httpServer.listen({ port: process.env.PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);

const { Teacher } = models;
// const temp = await Teacher.findById("65504b640698781c2e4f0ff5");
// temp.gender = "male";
// await temp.save();
// console.log(temp);
