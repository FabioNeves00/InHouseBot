const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
    },
    prize: {
        type: String,
        required: true,
    },
    tournament: {type: Boolean}
});

module.exports = mongoose.model("Tournament", tournamentSchema)