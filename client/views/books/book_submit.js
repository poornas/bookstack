Template.bookSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var book = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			pubDate: $(e.target).find('[name=pubDate]').val(),
			tags: $(e.target).find('[name=tags]').val()
		}; 
		console.log("sub...page" + book.tags);
		Meteor.call('book', book, function(error,id){
			if (error) 
				Errors.throw(error.reason);

			if (error.reason === 302) {
				Router.go('bookPage',{ message: error.details});
			} else {
				Router.go('bookPage',{_id: id});
			}
		});
		Router.go('booksList');
	}
});