import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "moderator", "admin"], 
    default: "user" 
  },
});

export const UserModel = mongoose.model("User", UserSchema);
