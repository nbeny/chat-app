const Messanger = require('../models/messanger.model');
const { to, ReE, ReS } = require('../services/util.service');

let messanger = async function (req, res, next) {
    let messanger_id, err, messanger;
    messanger_id = req.params.messanger_id;

    [err, messanger] = await to(Messanger.findOne({_id:messanger_id}));
    if(err) return ReE(res,"err finding messanger");

    if(!messanger) return ReE(res, "messanger not found with id: "+messanger_id);
    let user, users_array;
    user = req.user;
    users_array = messanger.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.messanger = messanger;
    next();
}
module.exports.messanger = messanger;