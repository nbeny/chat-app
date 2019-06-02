const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const MessangerController = require('../controllers/messanger.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

// router.post(    '/users/sendmail',  UserController.sendmail);
// router.post(    '/users/verify',    UserController.verify);                                                    // V

router.post(    '/messanger',             passport.authenticate('jwt', {session:false}), MessangerController.create);                  // C
router.get(     '/messanger',             passport.authenticate('jwt', {session:false}), MessangerController.getAll);                  // R

router.get(     '/messanger/:messanger_id', passport.authenticate('jwt', {session:false}), custom.messanger, MessangerController.get);     // R
router.put(     '/messanger/:messanger_id', passport.authenticate('jwt', {session:false}), custom.messanger, MessangerController.update);  // U
router.delete(  '/messanger/:messanger_id', passport.authenticate('jwt', {session:false}), custom.messanger, MessangerController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
