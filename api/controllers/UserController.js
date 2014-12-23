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
				res.redirect('/user/show/' + user.id);
			});
	},
	'show' : function (req, res,next) {
		 User.findOne(req.param('id'), function foundOne(err, user) {
			if (err) {
				console.log(err);
				return next(err);
			}
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},
	'edit' : function (req, res, next) {
		User.findOne(req.param('id'), function foundOne(err, user) {
			if (err) return next(err);
			if (!user) return next('User doesnt exist');
			res.view({
				user: user
			});
		})
	} ,
	'update' : function(req, res, next) {

		User.update(req.param('id'), req.params.all(), function userUpdated(err) {
			if (err) {
				return res.redirect('/user/edit' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	},
	'index' : function(req, res, next) {
		User.find(function foundUsers(err, users) {
				if (err) return next(err);
				res.view({
					users: users
				});
		});
	},
	'destroy' : function( req, res) {
		
	}
};
