const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  locations: {
    type: String,
    default: "Amsterdam",
  },
  shortBio: {
    type: String,
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dczamxzfb/image/upload/v1618740529/ocra-app-project/r0yxm8kqlsbavskslepl.png",
  },
});

const User = model("User", userSchema);

module.exports = User;
