const nodemailer = require("nodemailer");
const { User } = require('../models');
const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');
const CONFIG = require('../config/config');


const mainNodeMailer = async function mainNodeMailer(user) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let TestAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.laposte.net",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: CONFIG.email_superuser, // generated ethereal user
            pass: CONFIG.password_superuser // generated ethereal password
        }
    });

    let info = await transporter.sendMail({
        from: '"Alesio 👻" <' + CONFIG.email_superuser + '>', //sender email
        to: user.email,
        subject: "Hello from Matchact ✔",
        text: "For login to you're account, please, verify you're email with the link bellow",
        html: "<a>http://localhost:3000/users/verify?verify=" + user._id + "</a>"
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getMessageUrl(info));
}
module.exports.mainNodeMailer = mainNodeMailer;


const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.username) {
        return ReE(res, 'Please enter an username to register.');
    } else if (!body.email) {
        return ReE(res, 'Please enter an email to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else if (!body.verifypassword) {
        return ReE(res, 'Please enter a second time your password to register.');
    } else if (!body.firstname) {
        return ReE(res, 'Please enter a firstname to register.');
    } else if (!body.lastname) {
        return ReE(res, 'Please enter a lastname to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);

        //mainNodeMailer(user).catch(console.error);

        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}
module.exports.create = create;


const verify = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.verify) {
        return ReE(res, 'the verification token is false.');
    }
}
module.exports.verify = verify;


const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, { user: user.toWeb() });
}
module.exports.get = get;


const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        console.log(err, user);

        if (err.message.includes('E11000')) {
            if (err.message.includes('username')) {
                err = 'This username is already in use';
            } else if (err.message.includes('email')) {
                err = 'This email address is already in use';
            } else {
                err = 'Duplicate Key Entry';
            }
        }

        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' + user.email });
}
module.exports.update = update;


const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.remove());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;