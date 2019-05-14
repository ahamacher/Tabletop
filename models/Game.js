const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    gameMaster: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model('games', gameSchema);
