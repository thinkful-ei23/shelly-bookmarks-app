/* global $ */

function handleExpand() {
	//when the condensed block is clicked, toggle condensed property
}

function handleGenerateBookmark() {
	//when submit pushed, make a new bookmark
	$('.js-bookmarks-add-form').on('submit', e => {
		e.preventDefault();
		console.log('submit', e);
		console.log(serializeJson(e.target));
	});
}

function serializeJson(form) {
	const formData = new FormData(form);
	const obj = {};
	formData.forEach((val, name) => obj[name] = val);
	return JSON.stringify(obj);

}

$(handleGenerateBookmark);