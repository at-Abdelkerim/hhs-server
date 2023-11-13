import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export default async (_, { tel, password }, { models: { User } }) => {
  const user = await User.findOne({ tel });
  if (user) {
    if (user.password == password) {
      return {
        accessToken: jwt.sign(
          { _id: user.id, role: user.role },
          process.env.ACCESS_TOKEN
        ),
        refreshToken: jwt.sign(
          { _id: user.id, role: user.role },
          process.env.REFRESH_TOKEN
        ),
      };
    }
    throw new GraphQLError("Please fill valid Password", {
      extensions: { code: "INVALIDPASSWORD" },
    });
  }
  throw new GraphQLError("Please fill valid tel", {
    extensions: { code: "INVALIDTEL" },
  });
};
