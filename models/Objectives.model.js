const { Schema, model } = require("mongoose");

const objectivesSchema = new Schema({
  problem: {
    type: String,
    required: true,
    default: `Not-Started`

  },
  category: {
    type: String,
    enum: [`Career`, `Passion`, `Relationships`, `Finance`, `Wellbeing`],
    required: true,
  },

  objectiveInput: {
    type: String,
    required: true,

  },

  objectiveEndDate: {
    type: Date,
    required: true,

  },

  keyResult: {
    type: String,
    required: true,

  },

  // Relational with action schema 
  action: {
    type: [],
    required: true,
  },

  buddy: {
    type: [],
    required: true,

  },

  status: {
    type: String,
    enum: [`Not Started`, `In-Progress`, `Completed`],
    default: `Not-Started`,
  }


}

)
