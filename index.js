import { config } from "dotenv";
config();
import { resolve } from "path";
import { createServer } from "http";
import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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
                req.headers.authorization || req.headers.Authorization;
            if (token) {
                try {
                    const { _id, role } = jwt.verify(
                        token.split(" ").length == 2
                            ? token.split(" ")[1]
                            : token,
                        process.env.ACCESS_TOKEN
                    );
                    result = { ...result, user: { _id, role } };
                } catch (err) {
                    console.error(err);
                }
            }
            return result;
        },
    })
);

await mongoose.connect(process.env.DB);
await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
