Books = new Meteor.Collection('books');

Books.allow({
	insert: function(userId, doc) {
		//only allow posting if logged in.
		return !! userId;
	}
})