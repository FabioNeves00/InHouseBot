const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: String
    },
    players: []
});

module.exports = mongoose.model("Team", teamSchema)