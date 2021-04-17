const { Schema, model } = require("mongoose");

const actionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  // One way linking is enough, we can remove this later 
  objectives: { type: Schema.Types.ObjectId, ref: "Objectives" },

  status: {
    type: String,
    enum: ["Not Started", "In-Progress", "Completed"],
    default: "Not Started",
  },

  picture: {
    type: String,
    default: "",
  },

  actionEndDate: {
    type: Date,
    required: true,
  },
});

const Action = model("Action", actionSchema);

module.exports = Action;
