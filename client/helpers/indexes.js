Template.registerHelper('indexes', function() {
     return ['books', 'tags'];
});

Template.registerHelper('booksForTag', function(tagName) {
	var matchingBookIds = Tags.find({'name': tagName},
		 	       {'bookId':1,'_id':0}).map(function(u){return u.bookId;}).toArray();
	return Books.find( { _id : { $in : matchingBookIds} });
});