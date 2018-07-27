/* global cuid, store */
/* eslint-disable-next-line no-unused-vars */

const store =(function() {
	let bookmarks = [];
	let ratingFilter = 0;

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

	const throwError = function(message) {
		let errorMessage = JSON.parse(message.responseText).message;
		console.log('Error is ' + errorMessage);
		alert(errorMessage);
	};
	
	return {bookmarks, ratingFilter, addBookmark, findById, findAndDelete, throwError};
}() );