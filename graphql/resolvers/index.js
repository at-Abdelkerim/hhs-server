import fs from "fs";

export default {
  Query: await fs
    .readdirSync("./graphql/resolvers/query")
    .reduce(async (query, file) => {
      return {
        ...(await query),
        [file.split(".")[0]]: await import("./query/" + file).then(
          ({ default: data }) => data
        ),
      };
    }, {}),
};
