const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');

const schema = new Schema({
    id: { type: ObjectId, default: uuidv4() },
    name: { type: String, default: "Community" ,required: true },
    messages: { type: String },
    users: { type: Array, default: null},
    typingUsers: { type: Array, default: null},
    isCommunity: { type: Boolean, default: true}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Chat', schema);