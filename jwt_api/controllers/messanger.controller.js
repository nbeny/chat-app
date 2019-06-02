const { Messanger } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, messanger;
    let user = req.user;

    let messanger_info = req.body;
    messanger_info.users = [{user:user._id}];

    [err, messanger] = await to(Messanger.create(messanger_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{messanger:messanger.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, companies;
    [err, companies] = await to(user.Companies());

    let companies_json = []
    for (let i in companies){
        let messanger = companies[i];
        companies_json.push(messanger.toWeb())
    }
    return ReS(res, {companies: companies_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let messanger = req.messanger;
    return ReS(res, {messanger:messanger.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, messanger, data;
    messanger = req.user;
    data = req.body;
    messanger.set(data);

    [err, messanger] = await to(messanger.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {messanger:messanger.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let messanger, err;
    messanger = req.messanger;

    [err, messanger] = await to(messanger.remove());
    if(err) return ReE(res, 'error occured trying to delete the messanger');

    return ReS(res, {message:'Deleted messanger'}, 204);
}
module.exports.remove = remove;