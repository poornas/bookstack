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
	imageurl: function() {
		return this.image_url ? this.image_url : "http://placehold.it/400x300";
	}
});

