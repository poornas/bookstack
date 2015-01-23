Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('books'), Meteor.subscribe('tags')];
	}
});

Router.map(function() {
	this.route('booksListWrapper', { path: '/'});
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

	this.route('booksByTags', {
		path: '/tags/:tagName',
		data: function() {
			console.log("paa=" + this.params.tagName);
			var matchingBooksCursor = Tags.find({'name': this.params.tagName},
		 	       {'bookId':1,'_id':0});
			console.log(matchingBooksCursor.count());
			if (matchingBooksCursor) {
				var matchingBookIds = matchingBooksCursor.map(function(u){return u.bookId;});
				//console.log("arrmap=" + arrmap);
				//var matchingBookIds = arrmap.toArray();
				b = Books.find( { _id : { $in : matchingBookIds} });
				console.log(b.count());
				return b;
			} else return null;
			
		}
	})
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
 