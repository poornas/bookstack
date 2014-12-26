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
			var userObj = {
				firstname: req.param('firstname'),
				lastname: req.param('lastname'),
				email: req.param('email'),
				password: req.param('password'),
				confirmation: req.param('confirmation')
			}
			User.create(userObj, function userCreated(err, user) {
				if (err) {
					console.log(err);

					req.session.flash = {
						err: err
					}
					return res.redirect('/user/new');
				}
				//log user in
				req.session.authenticated = true;
				// Change status to online
				user.online = true;
				req.session.User = _.clone(user);

				user.save(function(err, user) {
					if (err) return next(err);
					res.redirect('/user/show/'+user.id);
				});
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
		if(req.session.User.admin) {
			var userObj = {
				firstname: req.param('firstname'),
				lastname: req.param('lastname'),
				email: req.param('email'),
				isadmin: req.param('admin')
			}
		} else {
			var userObj = {
				firstname: req.param('firstname'),
				lastname: req.param('lastname'),
				email: req.param('email'),
 			}
		}
		User.update(req.param('id'), userObj, function userUpdated(err) {
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
		User.findOne(req.param('id'), function(err, user) {
			if (err) return next(err);
			if (!user) return next('User does not exist');

			User.destroy(req.param('id'),function userDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('/user');
		});
	}
};
