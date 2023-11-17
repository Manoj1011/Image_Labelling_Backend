const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Image"
    },
    user_label: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    strict: false,
  }
);

module.exports = mongoose.model("UserLabel", schema, "user_labels");
