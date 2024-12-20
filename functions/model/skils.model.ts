import mongoose, { Schema } from "mongoose";



const SkillsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    image:{
      type:String,
      required:[false, "Please enter your name"]
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;