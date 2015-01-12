 Template.booksList.helpers({ 
	books: function() {
		//sort by newest 
		return Books.find({},{sort: {submitted: -1}});
	}
});

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