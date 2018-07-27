/* global cuid, store */
/* eslint-disable-next-line no-unused-vars */

const store =(function() {
	let bookmarks = [
		{
			// title: 'Example Bookmark',
			// url: 'somewhere.com',
			// desc: 'Lorem Ipsum',
			// rating: 3,
			// condensed: true,
			// id: cuid()
		}
	];
	let ratingFilter = 0;
	let editingMode = false;

	const addBookmark = function(item) {
		this.bookmarks.push(item);
	};

	return {bookmarks, ratingFilter, editingMode, addBookmark};
}() );