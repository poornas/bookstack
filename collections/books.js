 Books = new Meteor.Collection('books');
 Books.allow({
 	update: ownsDocument,
 	remove: ownsDocument
 });
// Books.initEasySearch(['title','tags']);

 EasySearch.createSearchIndex('books', {
    'field' : 'title',  // required, searchable field(s)
    'collection' : Books,          // required, Mongo Collection
    'limit' : 20                  // not required, default is 10
 });
 Books.deny({
 	update: function(userId, book, fieldNames,tags){
 		return (_.without(fieldNames,'url', 'title', 'pubDate','tags').length > 0);
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
 		var book = _.extend(_.pick(bookAttributes,'url','title','pubDate','tags'), {
 			userId: user._id,
 			author: user.username,
 			submitted: new Date().getTime(),
 			tags: bookAttributes.tags
 		});

 		console.log("bookAttributes" + bookAttributes.tags.split(","));
 	 	console.log("bookAttributes" + bookAttributes.tags.split(",")[0]);
	 
 		var bookId = Books.insert(book); 
 		var tags  = bookAttributes.tags.split(",");
 		for (tagindex in tags) {
 			insertTag(tags[tagindex],bookId);
 		}
 		return bookId;
 	},
 	updateBook: function(bookId, bookAttributes) {
  	var book = Books.findOne(bookId);
    if(ownsDocument){ 
      var oldTags = book.tags.split(",");
    
      var newTags = bookAttributes.tags.split(",");
      var deletedTags = _.difference(oldTags,newTags);
      var addedTags = _.difference(newTags,oldTags);
      Books.update(book._id, {$set: bookAttributes}, function(error){

  		if (error) { 
        console.log("errorrr");
  			throw new Meteor.Error(302,"You don't have permission to delete this comment." );
      }
  	  });
      for (tagindex in addedTags) { 
   			insertTag(addedTags[tagindex],bookId);
   	  }
   	  for (tagindex in deletedTags) {
   	  	 deleteTag(deletedTags[tagindex], bookId);
   	  }
      return;
 	 }
 	}, 
  removeBook: function(bookId){
    var book = Books.findOne(bookId);
    if (ownsDocument) {
      var oldTags = book.tags.split(",");
      Books.remove(bookId, function(error){
        if (error) { 
          throw new Meteor.Error(302,"You don't have permission to delete this comment." );
        }
        for (tagindex in oldTags) {
          deleteTag(oldTags[tagindex], bookId);          
        }
      
      });
      return;
    }
  }
 });

 insertTag = function(tagName, bookId) {
 	var now = new Date().getTime(); 
 	if (!Tags.findOne({name: tagName})) {
 		Tags.insert({
			bookId: bookId,
			submitted: now,	
			name: tagName
		});
 	}
 	
 }

 deleteTag = function(tagName, bookId) {
 	var target = Tags.findOne({name: tagName, bookId: bookId});
 	if (target) {
 		Tags.remove(target._id);
 	}
 }