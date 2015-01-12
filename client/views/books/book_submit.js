Template.bookSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var book = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			pubDate: $(e.target).find('[name=pubDate]').val()
		}; 
		console.log("sub...page");
		book._id = Books.insert(book);
		Router.go('bookPage',book);
	}
});