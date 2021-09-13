const mongoose = require('mongoose');

const treeSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    teams: {
        type: Array,
        required: true
    },
    tree: {type: Boolean}
});

module.exports = mongoose.model("Tree", treeSchema)