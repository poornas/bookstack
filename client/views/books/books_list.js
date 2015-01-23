 Template.booksList.helpers({ 
	books: function() {
		//sort by newest 
		return Books.find({},{sort: {submitted: -1}});
	}
});

Template.searchResultsByTags.helpers({
	booksForTag: function() {
		//var matchingBookIds = Tags.find({'name': tagName},
		// 	       {'bookId':1,'_id':0}).map(function(u){return u.bookId;}).toArray();
		//return Books.find( { _id : { $in : matchingBookIds} });
		console.log(this);
		console.log(this.bookId);
		console.log(this.title);
		return Books.find({_id: this.bookId});
	}
})
Template.bookItem.helpers({
	domain: function() {
		a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});

//to do - hook it right
$.getScript('//cdn.jsdelivr.net/isotope/1.5.25/jquery.isotope.min.js',function(){

  /* activate jquery isotope */
  $('#books').imagesLoaded( function(){
    $('#books').isotope({
      itemSelector : '.item'
    });
  });
  
});