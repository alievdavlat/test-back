import mongoose, { Schema } from "mongoose";



const CommentSchema = new mongoose.Schema(
  {
    
    username: {
      type: String,
      required: [true, "Please enter your name"],
    },
    usrjob: {
      type: String,
      required: [true, "Please enter your password"],
    },
    rate: {
      type: Number,
      required: [true, "Please enter your password"],
    },
    msg: {
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

const Comments = mongoose.model("Comments", CommentSchema);

export default Comments;
