 Books = new Meteor.Collection('books');

 Books.allow({
 	update: ownsDocument,
 	remove: ownsDocument
 });

 Books.deny({
 	update: function(userId, book, fieldNames){
 		return (_.without(fieldNames,'url', 'title', 'pubDate').length > 0);
 	}
 });
 Meteor.methods({
 	book: function(bookAttributes) {
 		var user = Meteor.user(),
 		bookWithSameLink = Books.findOne({url: bookAttributes.url});

 		if (!user)
 			throw new Meteor.Error(401, "You need to log in to add books");

 		if (!bookAttributes.title) 
 			throw new Meteor.Error(422, " Please fill in a title");

 		if (bookAttributes.url && bookWithSameLink) {
 			throw new Meteor.Error(302, 'This link has already been added',bookWithSameLink._id);
 		}

 		var book = _.extend(_.pick(bookAttributes,'url','title','pubDate'), {
 			userId: user._id,
 			author: user.username,
 			submitted: new Date().getTime()
 		});

 		 
 		var bookId = Books.insert(book);
 		return bookId;
 	}
 });