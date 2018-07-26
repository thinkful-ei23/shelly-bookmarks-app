/* global cuid, store */
/* eslint-disable-next-line no-unused-vars */

const store =(function() {
	let bookmarks = [
		{
			title: 'Example Bookmark',
			url: 'somewhere.com',
			description: 'Lorem Ipsum',
			rating: 3,
			condensed: true,
			id: cuid()
		}
	];
	let ratingFilter = 0;
	let editingMode = false;

	const addBookmark = function(item) {
		item.condensed = true;
		item.id = cuid();
		this.bookmarks.push(item);
		return item;
	};

	return {bookmarks, ratingFilter, editingMode, addBookmark};
}() );