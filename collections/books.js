Books = new Meteor.Collection('books');

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
 			title: bookAttributes.title + (Meteor.isServer ? '(server)': '(client)'),
 			userId: user._id,
 			author: user.username,
 			submitted: new Date().getTime()
 		});

 		if (Meteor.isServer){
 			Meteor._sleepForMs(5000);
 		}

 		var bookId = Books.insert(book);
 		return bookId;
 	}
 });