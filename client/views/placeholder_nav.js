Template.placeholderNavbar1.events({
	'click .filter': function(e) {
		e.preventDefault();
		var tagName = e.target;
		console.log(e.target.attr("data-filter"));
		}
});