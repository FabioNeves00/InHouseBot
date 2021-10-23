const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  discordTag: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
