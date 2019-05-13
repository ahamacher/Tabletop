const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    position: {
        type: Array,
        required: true,
        default: [0,0]
    },
    scalefactor: {
        type: Float,
        required: true,
        default: 1.0 
    },
    layer_id: {
        type: Integer,
        required: true
    },
    game_id: {
        type: Integer,
        required: true
    },

})

module.exports = User = mongoose.model('images', ImageSchema);
