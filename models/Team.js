const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: String
    },
    players: {type: [String]},
    team: {type: Boolean},
    winner: {type: Boolean}
});

module.exports = mongoose.model("Team", teamSchema)