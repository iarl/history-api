import { AuthenticationError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET!;

// Define the type for register arguments
interface RegisterArgs {
    username: string;
    password: string;
    role: "user" | "moderator" | "admin";
}
  
  // Define the type for login arguments
interface LoginArgs {
    username: string;
    password: string;
}

export const authResolvers = {
  Mutation: {
    register: async (_: any, { username, password, role }: RegisterArgs) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ username, password: hashedPassword, role });
      await user.save();
      return { message: "User registered successfully" };
    },

    login: async (_, { username, password }: LoginArgs) => {
      const user = await UserModel.findOne({ username });
      if (!user) throw new AuthenticationError("User not found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new AuthenticationError("Invalid password");

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token };
    },
  },
};
