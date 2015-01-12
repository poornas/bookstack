Template.bookSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		var book = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			pubDate: $(e.target).find('[name=pubDate]').val()
		}; 
		console.log("sub...page");
		Meteor.call('book', book, function(error,id){
			if (error) 
				return alert(error.reason);
		});
		Router.go('booksList');
	}
});