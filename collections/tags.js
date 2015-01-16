Tags =  new Meteor.Collection("tags");

if (Books.find().count() === 0) {
	var now = new Date().getTime();

	var tomId = Meteor.users.insert({
		profile: {name: 'Tom Colemans'}
	});
	var tom = Meteor.users.findOne(tomId);

	var peterId = Meteor.users.insert({
		profile: {name: 'Peter Schaff'}
	})
	var peter = Meteor.users.findOne(peterId);

	var pythonId = Books.insert({
		title: 'Python Power',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://pythonpower.com',
		submitted: now - 7 * 3600 * 1000
	});

	Tags.insert({
		bookId: pythonId,
		submitted: now - 5 * 3600 * 1000,
		name: "python"
	});
	Tags.insert({
		bookId: pythonId,
		submitted: now - 5 * 3600 * 1000,
		name: "webapp"
	});
	var python2Id = Books.insert({
		title: 'Numerical Recipes in Python',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://numericalpython.com',
		submitted: now - 7 * 3600 * 1000
	});

	Tags.insert({
		bookId: python2Id,
		submitted: now - 5 * 3600 * 1000,
		name: "python"
	});
	Tags.insert({
		bookId: python2Id,
		submitted: now - 5 * 3600 * 1000,
		name: "webapp"
	});
}
