Template.bookItem.helpers({
	ownBook: function() {
		return this.userId == Meteor.userId();
	},
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	tags: function() {
		return Tags.find({bookId: this._id});
	},
});

