Template.bookEdit.events({
	'submit form' : function(e) {
		e.preventDefault();

		var currentBookId = this._id;

		var bookProperties = {
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
		}
		Meteor.call('updateBook', currentBookId, bookProperties, function(error,id) {
			if (error && error.reason === 302) {
				Router.go('bookPage',{ message: error.details});
			} else {
				Router.go('bookPage',{_id: currentBookId});
			}
		});		
		// Books.update(currentBookId, {$set: bookProperties}, function(error){
		// 	if (error) {
		// 		Errors.throw(error.reason);
		// 	} else {
		// 		Router.go('bookPage', {_id: currentBookId});
		// 	}
		// });
	},
	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this book?")) {
			var currentBookId = this._id;
			Meteor.call('removeBook',currentBookId);
			Router.go('booksListWrapper');
		}
	}
});