const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", schema, "users");
