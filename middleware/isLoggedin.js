import { AuthenticationError } from "apollo-server-micro";

export const isLoggedin = (_, __, { user }) => {
  if (!user) throw new AuthenticationError("Authentication Error");
};