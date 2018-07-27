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

	const deleteB = function(id,callback, error) {
		$.ajax({
			url : BASE_URL + '/bookmarks/' + id,
			method : 'DELETE',
			contentType : 'application/json',
			success : callback,
			error : error
		});
	};

	return {getB, createB, deleteB};
}() );