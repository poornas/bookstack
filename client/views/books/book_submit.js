Template.bookSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var book = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			pubDate: $(e.target).find('[name=pubDate]').val(),
			tags: $(e.target).find('[name=tags]').val(),
			reviews: $(e.target).find('[name=reviews]').val(),
			stars: $(e.target).find('[name=stars]').val(),
			price: $(e.target).find('[name=price]').val(),
			download_url: $(e.target).find('[name=download_url]').val(),
			image_url: $(e.target).find('[name=image_url]').val(),

			pages: $(e.target).find('[name=pages]').val()

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
		Router.go('booksListWrapper');
	}
});