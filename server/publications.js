Meteor.publish('books', function() {
	return Books.find();
});

Meteor.publish('tags', function() {
	return Tags.find();
});