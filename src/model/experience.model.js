import mongoose, { Schema } from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "Please enter your company name"],
    },
    period: {
      type: String,
      required: [true, "Please enter your period"],
    },
    job: {
      type: String,
      required: [true, "Please enter your job"],
    },
    description: {
      type: String,
      required: [true, "Please enter your description"],
    },
    logo:{
      type:String,
      required: [false, "Please enter your company logo"]
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
