if (Books.find().count() === 0) {
	Books.insert({
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://sachagreif.com/introducing-telescope/'
	});
	Books.insert({
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com'
	});
	Books.insert({
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	});

	Books.insert({
		title: 'The Python Manual', 
		author: 'Monty Python',
		url: 'http://thepythonmanual.com'
	});
	Books.insert({
		title: 'Javascript Magic', 
		author: 'Addy Osmani',
		url: 'http://javascriptmagic.com'
	});

	Books.insert({
		title: 'The Ruby Cookbook', 
		author: 'Rubius George',
		url: 'http://rubycookbook.com'
	});
	Books.insert({
		title: 'Tortured Turtle', 
		author: 'Robert Gee',
		url: 'http://turtlebook.com'
	});
}
