const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageInstanceSchema = new Schema({
    positionX: {
        type: Number,
        required: true,
        default: 0
    },
    positionY: {
        type: Number,
        required: true,
        default: 0
    },
    scalefactor: {
        type: Schema.Types.Decimal128,
        required: true,
        default: 1.0
    },
    layer_id: {
        type: Number,
        required: true,
        default: 1
    },
    image_id: {
        type: Schema.Types.ObjectId, 
        ref: 'images' 
    }
})


module.exports = ImageInstance = mongoose.model('image_instances', ImageInstanceSchema);