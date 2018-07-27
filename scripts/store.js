/* global cuid, store */
/* eslint-disable-next-line no-unused-vars */

const store =(function() {
	let bookmarks = [
		// {
		// 	// title: 'Example Bookmark',
		// 	// url: 'somewhere.com',
		// 	// desc: 'Lorem Ipsum',
		// 	// rating: 3,
		// 	// condensed: true,
		// 	// id: cuid()
		// }
	];
	let ratingFilter = 0;
	let editingMode = false;

	const addBookmark = function(item) {
		item.condensed = true;
		this.bookmarks.push(item);
	};

	const findById = function(id) {
		return this.bookmarks.find(item => item.id === id);
	};

	const findAndDelete = function(id) {
		this.bookmarks = this.bookmarks.filter(item => item.id !== id);
	};
	
	return {bookmarks, ratingFilter, editingMode, addBookmark, findById, findAndDelete};
}() );