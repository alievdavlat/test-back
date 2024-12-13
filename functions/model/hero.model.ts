import mongoose, { Schema } from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    description: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Hero = mongoose.model("Hero", heroSchema);



export default Hero;
