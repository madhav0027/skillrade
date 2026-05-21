const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video: { type: String, required: true }, // YouTube embed link
  transcript: String,
  content: String,

  duration: { type: Number, required: true }, // in seconds
  order: { type: Number, required: true }, // lesson sequence
});

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    slug: { type: String, unique: true },  

    description: String,
    thumbnail: String,

    lessons: [lessonSchema],

    totalDuration: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);