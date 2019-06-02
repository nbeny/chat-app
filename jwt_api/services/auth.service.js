const { User } 	    = require('../models/index');
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
    let email = validator.isEmail(userInfo.email);
    if(!email) TE('The email was not valide.');
    let username = validator.isAlphanumeric(userInfo.username);
    if(!username) TE('The username was not valide.');
    let firstname = validator.isAlphanumeric(userInfo.firstname)
    if(!firstname) TE('The firstname is not valide.')
    let lastname = validator.isAlphanumeric(userInfo.lastname)
    if(!lastname) TE('The lastname is not valide.')
    let verifypassword = userInfo.password.compareStr(userInfo.verifypassword)
    if(verifypassword) TE('Password are not similare.')

    if(email && username && firstname && lastname && !verifypassword) {
        let user = new User({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            isadmin: false,
            isverify: false
        })

        user.save((err, savedUser) => {
            if (err) {
                console.error(err);
                return null;
            } else {
                console.log(savedUser);
                return savedUser;
            }
        })
    }else{
        TE('An Error occured.');
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

        [err, user] = await to(User.findOne({ email:unique_key }));
        if(err) TE(err.message);
    }else if(validator.isAlphanumeric(unique_key)){//checks if only username was sent
        auth_info.method='username';

        [err, user] = await to(User.findOne({ username:unique_key }));
        if(err) TE(err.message);
    }else{
        TE('A valid email or username was not entered');
    }

    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;
}
module.exports.authUser = authUser;