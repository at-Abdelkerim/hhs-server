import fs from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers/index.js";

export default await fs
  .readdirSync("./graphql/directives")
  .reduce(
    async (schema, file) =>
      await import("./directives/" + file).then(
        ({ default: directiveTransformer }) =>
          directiveTransformer(schema, file.split(".")[0])
      ),
    makeExecutableSchema({ typeDefs, resolvers })
  );
