/* global $, store, bookmarksList, api */

function handleGenerateBookmark() {
	//when submit pushed, make a new bookmark
	$('.js-bookmarks-add-form').on('submit', e => {
		e.preventDefault();
		console.log('submit pushed');
		let newBookmark = serialize(e.target);
		api.createB(newBookmark, response => {
			store.addBookmark(response);
			$('#bookmark-list').append(generateBookmark(response));
		});
	});
}

function serialize(form) {
	const formData = new FormData(form);
	const obj = {};
	formData.forEach((val, name) => obj[name] = val);
	console.log('returning serialized obj');
	return obj;

}

function generateBookmark(bookmark) {
	//after receiving key:values from submitted form
	console.log('bookmark created');
	return `
		<li class="js-bookmark" data-item-id="${bookmark.id}">
			${bookmark.title} 
			${bookmark.rating}
			<button class="delete-button">
				<span class="button-label">remove</span>
			</button>
		</li>`;
}


function getItemIdFromElement(item) {
	let upstream = $(item)
		.closest('li.js-bookmark')
		.data('item-id');
	return upstream;
}

function handleDeleteBookmark() {
	//deletes bookmark when "remove" is clicked
	$('#bookmark-list').on('click', '.delete-button', e => {
		const dataId = getItemIdFromElement(e.target);
		console.log('delete pressed');
		//console.log(dataId);
		api.deleteB(dataId, store.findAndDelete(dataId));
		render();
	});
}

function generateItemsString(list) {
	const items = list.map((item) => generateBookmark(item));
	return items.join('');
}

function render() {
	let items = store.bookmarks;

	// render the shopping list in the DOM
	console.log('`render` ran');
	const bookmarkString = generateItemsString(items);

	// insert that HTML into the DOM
	$('#bookmark-list').html(bookmarkString);
}

$(document).ready(function() {
	handleGenerateBookmark();
	handleDeleteBookmark();
	api.getB(response => {
		response.forEach(item => {
			store.addBookmark(item);
			$('#bookmark-list').append(generateBookmark(item));
		});
	});
});