// The template Manager for Books list
var booksData = [ {
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://sachagreif.com/introducing-telescope/'
	}, 
	{
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}, {
		title: 'The Meteor Book', 
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	}
];

Template.booksList.helpers({ books: booksData
});

$.getScript('//cdn.jsdelivr.net/isotope/1.5.25/jquery.isotope.min.js',function(){

  /* activate jquery isotope */
  $('#books').imagesLoaded( function(){
    $('#books').isotope({
      itemSelector : '.item'
    });
  });
  
});