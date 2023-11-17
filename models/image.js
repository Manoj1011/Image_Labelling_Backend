const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    imageurl: {
      type: String,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Image", schema, "images");
