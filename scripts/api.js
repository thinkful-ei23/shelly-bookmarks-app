const api =(function() {
	const BASE_URL = 'https://thinkful-list-api.herokuapp.com/shelly';

	const getB = function(callback){
		$.getJSON(BASE_URL + '/items', callback);
	};

	const createB = function(object, callback) {
		let newItem = JSON.stringify(object);
		$.ajax({
			url : BASE_URL + '/bookmarks',
			method : 'POST',
			contentType : 'application/json',
			data : newItem,
			success : callback
		});
	};

	return {getB, createB};
}() );