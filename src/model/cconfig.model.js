import mongoose, { Schema } from "mongoose";

const configSchema = new mongoose.Schema(
  {
    showTestimonials: {
      type: Boolean,
    },
    showEexperience: {
      type: Boolean,
    },
    avatar: {
      type: String,
    },
    
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Mongoose model creation
const Config = mongoose.model("Config", configSchema);

export default Config;
