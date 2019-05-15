const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: "games"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    positionX: {
        type: Number,
        default: 0
    },
    positionY: {
        type: Number,
        default: 0
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema);