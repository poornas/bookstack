Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('books'), Meteor.subscribe('tags')];
	}
});

Router.map(function() {
	this.route('booksList', { path: '/'});
	this.route('bookPage', {
		path: '/books/:_id',
		data: function() { return Books.findOne(this.params._id);}
	});

	this.route('bookEdit', {
		path: '/books/:_id/edit',
		data: function() { return Books.findOne(this.params._id);}
	});
	this.route('bookSubmit', {
		path: '/submit'
	});
});

var requireLogin = function() { 
	console.log("m user=" + Meteor.user() + "> " + Meteor.loggingIn() + " ? ");
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');
		
		this.stop();
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'bookPage'});
Router.onBeforeAction(requireLogin, { only: 'bookSubmit'});
