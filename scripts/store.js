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

	return {bookmarks, ratingFilter, editingMode};
}() );