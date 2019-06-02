const mongoose 			= require('mongoose');
const {TE, to}          = require('../services/util.service');

let MessangerSchema = mongoose.Schema({
    name: {type:String, require: true},
    users:  [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:{type:String}} ],
    discussion: [{
        user: {type: String},
        message: {type: String},
        date: {type: Date}
    }]
}, {timestamps: true});

UserSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'messangers.messanger',
    justOne: false
});

MessangerSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let Messanger = module.exports = mongoose.model('Messanger', MessangerSchema);

