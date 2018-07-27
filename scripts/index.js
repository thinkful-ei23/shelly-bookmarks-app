/* global $, store, bookmarksList, api */

function handleGenerateBookmark() {
	//when submit pushed, make a new bookmark
	$('.js-bookmarks-add-form').on('submit', e => {
		e.preventDefault();
		//console.log('submit', e);
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
	return obj;

}

function generateBookmark(bookmark) {
	//after receiving key:values from submitted form
	return `
		<li class="js-bookmark" data-item-id="${bookmark.id}">
			${bookmark.title} 
			${bookmark.rating}
			<div class="bookmark-controls">
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
			</div>
		</li>`;
}

function handleRemoveItemClicked() {
	
}

function deleteBookmark(bookmark) {
	//deletes bookmark when "remove" is clicked
	$('.bookmark-list').on('click', '.delete-button' e => {
		console.log(e);
	});
}

$(document).ready(function() {
	handleGenerateBookmark();
	api.getB(response => {
		response.forEach(item => {
			store.addBookmark(item);
			$('#bookmark-list').append(generateBookmark(item));
		});
	});
});