const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    requried: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  games: [{ type: Schema.Types.ObjectId, ref: 'games' }]
})

module.exports = User = mongoose.model('users', UserSchema);
