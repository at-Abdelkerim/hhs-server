import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export default async (_, { tel, password }, { models: { User } }) => {
  const user = await User.findOne({ tel });
  if (user) {
    if (user.password == password) {
      return {
        accessToken: jwt.sign(
          { id: user.id, role: user.role },
          process.env.ACCESS_TOKEN
        ),
        refreshToken: jwt.sign(
          { id: user.id, role: user.role },
          process.env.REFRESH_TOKEN
        ),
      };
    }
    throw new GraphQLError("Please fill correct Password", {
      extensions: { code: "INVALID PASSWORD" },
    });
  }
  throw new GraphQLError("Please fill correct tel", {
    extensions: { code: "INVALID TEL" },
  });
};
