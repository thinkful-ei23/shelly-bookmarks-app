/* global $, store, api, bookmarkers*/

$(document).ready(function() {
	bookmarkers.binder();
	api.getB(response => {
		response.forEach(item => {
			store.addBookmark(item)});
			bookmarkers.render();
	});
});