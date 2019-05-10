const { User } 	    = require('../models');
const validator     = require('validator');
const { to, TE }    = require('../services/util.service');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or username and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else if(typeof body.username != 'undefined'){
            unique_key = body.username
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;


const getVerifyKeyFromBody = function(VerifyKey){
    if (VerifyKey === 'undefined') {
        VerifyKey = null;
    } else {
        return VerifyKey;
    }
}
module.exports.getVerifyKeyFromBody = getVerifyKeyFromBody;


const createUser = async function(userInfo){
    let email, username, auth_info, err;

    auth_info={}
    auth_info.status='create';

    email = getVerifyKeyFromBody(userInfo.email);

    if(!email) TE('An email was not entered.');

    username = getVerifyKeyFromBody(userInfo.username);

    if(!username) TE('An username was not entered.');


    if(validator.isEmail(email) && validator.isAlphanumeric(username)){
        auth_info.method = 'email';
        userInfo.email = email;
        auth_info.method = 'username';
        userInfo.username = username;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that email or that username');

        return user;

    }else if(validator.isAlphanumeric(username)){//checks if only username was sent
        auth_info.method = 'username';
        userInfo.username = username;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that username');

        return user;
    }else{
        TE('A valid email or username was not entered.');
    }
}
module.exports.createUser = createUser;


const authUser = async function(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';

    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter an email or username to login');

    if(!userInfo.password) TE('Please enter a password to login');

    let user;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';

        [err, user] = await to(User.findOne({email:unique_key }));
        if(err) TE(err.message);

    }else if(validator.isAlphanumeric(unique_key, 'any')){//checks if only username was sent
        auth_info.method='username';

        [err, user] = await to(User.findOne({username:unique_key }));
        if(err) TE(err.message);

    }else{
        TE('A valid email or phone number was not entered');
    }

    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;