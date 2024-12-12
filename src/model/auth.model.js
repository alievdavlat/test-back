import mongoose, { Schema } from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    
    username: {
      type: String,
      required: [true, "Please enter your name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    avatar: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Mongoose model creation
const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;
