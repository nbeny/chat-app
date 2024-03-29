const mongoose 			= require('mongoose');
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const Messanger         = require('./messanger.model');
const validate          = require('mongoose-validator');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

let UserSchema = mongoose.Schema({
    firstname:      {type:String, default: 'Anonymous'},
    lastname:       {type:String, default: 'Anonymous'},
    username:	    {type:String, trim: true, require: true, unique: true,
        validate:[validate({
            validator: 'isAlphanumeric',
            message: 'Not a valid Username.'
        })]
    },
    email:      {type:String, trim: true, require: true, unique: true,
            validate:[validate({
                validator: 'isEmail',
                message: 'Not a valid email.'
            })]
    },
    password:   {type:String, required: true},
    messangers:  [{type : mongoose.Schema.ObjectId, ref : 'Messanger'}],

    isadmin:    {type:Boolean, default: false},
    isonline:   {type:Boolean, default: false},
    isverify:   {type:Boolean, default: false}
}, {timestamps: true});

UserSchema.virtual('messanger', {
    ref: 'Messanger',
    localField: '_id',
    foreignField: 'users.user',
    justOne: false
});

UserSchema.pre('save', async function(next){

    if(this.isModified('password') || this.isNew){

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if(err) TE(err.message, true);

        this.password = hash;

    } else{
        return next();
    }
})

UserSchema.methods.comparePassword = async function(pw){
    let err, pass;
    if(!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return this;
}

// UserSchema.methods.Companies = async function(){
//     let err, companies;
//     [err, companies] = await to(Company.find({'users.user':this._id}));
//     if(err) TE('err getting companies');
//     return companies;
// }

// UserSchema.virtual('full_name').set(function (name) {
//     var split = name.split(' ');
//     this.first = split[0];
//     this.last = split[1];
// });

// UserSchema.virtual('full_name').get(function () { //now you can treat as if this was a property instead of a function
//     if(!this.firstname) return null;
//     if(!this.lastname) return this.firstname;

//     return this.firstname + ' ' + this.lastname;
// });

UserSchema.methods.getJWT = function(){
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer "+jwt.sign({user_id:this._id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};

UserSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let User = module.exports = mongoose.model('User', UserSchema);
