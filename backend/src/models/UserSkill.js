const mongoose = require("mongoose");

const UserSkillschema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    SkillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    level: {
      type: String,
      default: "beginner",
    },
    progress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Started", "In-Progress", "Verified"],
      default: "Started",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserSkill", UserSkillschema);
