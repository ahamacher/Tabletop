const mongoose = require("Mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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

module.exports = Game = mongoose.model('games', GameSchema);
