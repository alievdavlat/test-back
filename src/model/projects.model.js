import mongoose, { Schema } from "mongoose";


const ProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    description: {
      type: String,
      required: [true, "Please enter your password"],
    },
    source_link: {
      type: String,
      required: [true, "Please enter your password"],
    },
    live_site: {
      type: String,
      required: [true, "Please enter your password"],
    },
    technalogies: {
      type: String,
      required: [true, "Please enter your password"],
    },
    iconList: {
      type: String,
      required: [false, "Please enter your password"],
    },
    pictures: {
      type: [String],
      required: [false, "Please enter your password"],
    },
    video: {
      type: String,
      required: [false, "Please enter your password"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Projects = mongoose.model("Projects", ProjectsSchema);


export default Projects;
