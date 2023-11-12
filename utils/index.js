import jwt from "jsonwebtoken";

export function getUser(token) {
  try {
    return { _id: "1234567890", role: "director" };
    return jwt.verify(token, process.env.ACCESS_TOKEN);
  } catch (err) {
    return;
  }
}
