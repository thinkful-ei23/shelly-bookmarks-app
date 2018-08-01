/* global $ */

// eslint-disable-next-line
const api =(function() {
	const BASE_URL = 'https://thinkful-list-api.herokuapp.com/shelly';

	const getB = function(callback){
		$.getJSON(BASE_URL + '/bookmarks', callback);
	};

	const createB = function(object, callback, error) {
		let newItem = JSON.stringify(object);
		$.ajax({
			url : BASE_URL + '/bookmarks',
			method : 'POST',
			contentType : 'application/json',
			data : newItem,
			success : callback,
			error : error
		});
	};

	const deleteB = function(id, callback, error) {
		$.ajax({
			url : BASE_URL + '/bookmarks/' + id,
			method : 'DELETE',
			contentType : 'application/json',
			success : callback,
			error : error
		});
	};

	const update = function(id, data, callback, error) {
		$.ajax({
			url: BASE_URL + '/bookmarks/' + id,
			method : 'PATCH',
			contentType : 'application/json',
			data: data,
			success: callback,
			error: error,
		});
	};

	const throwError = function(message) {
		let errorMessage = JSON.parse(message.responseText).message;
		console.log('Error is ' + errorMessage);
		alert(errorMessage);
	};

	return {getB, createB, deleteB, throwError, update};
}() );