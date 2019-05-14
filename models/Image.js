const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    game_id: {
        type: Schema.Types.ObjectId, 
        ref: 'games' 
    }

})

module.exports = Image = mongoose.model('images', ImageSchema);
