Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('books');}
});

Router.route('/', function () {
  this.render('booksList');
});
