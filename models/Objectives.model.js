const { Schema, model } = require("mongoose");

const objectivesShema = new Schema({
  problem: {
    type: String,
    required: true,
    unique: true,

  },
  category: {
    type: String,
    enum: ['Career, Passion, Relationships, Finance '],
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

  action: {
    type: [],
    required: true,
  },

  buddy: {
    type: [],
    required: true,

  }






}








})