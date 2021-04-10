const { Schema, model } = require("mongoose");

const actionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  buddy: { type: Schema.Types.ObjectId, ref: "Objectives" },

  status: {
    type: String,
    enum: [`Not Started`, `In-Progress`, `Completed`],
    default: `Not-Started`,
  },

  picture: {
    type: String,
    default: "",
  },
});

const Action = model("actions", actionSchema);

module.exports = Action;
