/* global $, store, bookmarksList, api */

function handleExpand() {
	//when the condensed block is clicked, toggle condensed property
}

function handleGenerateBookmark() {
	//when submit pushed, make a new bookmark
	$('.js-bookmarks-add-form').on('submit', e => {
		e.preventDefault();
		//console.log('submit', e);
		let newBookmark = serialize(e.target);
		api.createB(newBookmark, response => console.log(response));
	});
}

function serialize(form) {
	const formData = new FormData(form);
	const obj = {};
	formData.forEach((val, name) => obj[name] = val);
	return obj;
	//return JSON.stringify(obj);

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
	//removes 
}

function deleteBookmark(bookmark) {
	//deletes bookmark when "remove" is clicked

}

$(handleGenerateBookmark);
