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
        type: Schema.Types.Decimal128,
        required: true,
        default: 1.0 
    },
    layer_id: {
        type: Number,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },

})

module.exports = Image = mongoose.model('images', ImageSchema);
