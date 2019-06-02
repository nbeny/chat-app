const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Chat = db.Chat;

module.exports = {
    createMessage,
    createChat,
    createChatNameFromUsers,
    getTime
};

async function createMessage() {

}

async function createChat() {

}

<<<<<<< HEAD
async function createChatNameFromUsers() {
=======
async function create(chatParam) {
    // validate
    if (await Chat.findOne({ id: chatParam.id })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
>>>>>>> 5b1b859a9419351c9d8b2d6120b5f4a042ad4bd9

}

async function getTime() {

}
// async function getAll() {
//     return await Chat.find().select('-hash');
// }

// async function getById(id) {
//     return await User.findById(id).select('-hash');
// }

// async function create(chatParam) {
//     // validate
//     if (await Chat.findOne({ id: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     const user = new User(userParam);

//     // hash password
//     if (userParam.password) {
//         user.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // save user
//     await user.save();
// }

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }

// // authenticate,
// // getAll,
// // getById,
// // create,
// // update,
// // delete: _delete