/* global $, store, api */

// eslint-disable-next-line
const bookmarkers = (function() {
	function handleGenerateBookmark() {
		//when submit pushed, make a new bookmark
		$('.js-bookmarks-add-form').on('submit', e => {
			e.preventDefault();
			console.log('submit pushed');
			let newBookmark = serialize(e.target);
			api.createB(newBookmark, response => {
				store.addBookmark(response);
				render();
			}, message => {
				api.throwError(message);
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
		if (!bookmark.condensed) {
			console.log('bookmark opened');
			return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
					Title: ${bookmark.title}
					<br>
					Rating: ${bookmark.rating}
					<br>
					Description: ${bookmark.desc}
				</div>
				<a target="_blank" href="${bookmark.url}">Visit Site: ${bookmark.url}</a>
				<br>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
		</li>`;
		}
	
		console.log('bookmark created');
		return `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
					Title: ${bookmark.title} 
					<br>
					Rating: ${bookmark.rating}
				</div>
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
	
	function handleClickCondensed() {
		//bookmarks.condensed = false
		$('#bookmark-list').on('click', '.js-bookmark-not-button', e => {
			console.log('bookmark clicked to uncondense');
			const dataId = getItemIdFromElement(e.target);
			let bookmark = store.findById(dataId);
			bookmark.condensed = !bookmark.condensed;
			render();
		});
	}

	function handleDropdownPicker() {
		$('.dropdown').on('change', e => {
			console.log('picked a rating');
			store.ratingFilter = Number($(e.target).val());
			console.log(store.ratingFilter);
			render();
		});
	}
	
	function generateItemsString(list) {
		const items = list.map((item) => generateBookmark(item));
		return items.join('');
	}
	
	function render() {
		console.log('all here');
		let books = store.bookmarks;
		if (store.ratingFilter > 0) {
			books = store.bookmarks.filter(item => {
				return item.rating >= store.ratingFilter;
			});
			console.log(books);

		}
		let bookmarkString = generateItemsString(books);
		$('#bookmark-list').html(bookmarkString);
	}

	function binder() {
		handleClickCondensed();
		handleDeleteBookmark();
		handleGenerateBookmark();
		handleDropdownPicker();
	}

	return {
		render, 
		binder
	};
}() );