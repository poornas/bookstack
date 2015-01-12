Template.bookEdit.events({
	'submit form' : function(e) {
		e.preventDefault();

		var currentBookId = this._id;

		var bookProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			pubDate: $(e.target).find('[name=pubDate]').val()
		}

		Books.update(currentBookId, {$set: bookProperties}, function(error){
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('bookPage', {_id: currentBookId});
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this book?")) {
			var currentBookId = this._id;
			Books.remove(currentBookId);
			Router.go('booksList');
		}
	}
});