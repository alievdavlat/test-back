import mongoose, { Schema } from "mongoose";


const MailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your password"],
    },
    msg: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Mails = mongoose.model("Mails", MailsSchema);

export default Mails;
