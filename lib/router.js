Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('books');}
});

Router.map(function() {
	this.route('booksList', { path: '/'});
	this.route('bookPage', {
		path: '/books/:_id',
		data: function() { return Books.findOne(this.params._id);}
	});
});
