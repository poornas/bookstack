/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new' : function(req, res) {
		  res.view();
	} ,
	'create' : function( req, res, next ) {
			User.create(req.params.all(), function userCreated(err, user) {
				if (err) {
					console.log(err);

					req.session.flash = {
						err: err
					}
					return res.redirect('/user/new');
				}
				res.json(user);
			});
	},
	'edit' : function (req, res, next) {

	} ,
	'update' : function(req, res, next) {

	},
	'destroy' : function( req, res) {

	}
};
