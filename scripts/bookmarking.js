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
		let bookmarkTemplate = '';
		if (!bookmark.condensed) {
			console.log('bookmark opened');
			bookmarkTemplate = `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
					<span><strong>Title: ${bookmark.title}</strong></span>
					<form class="editing-information>
						<label for="title-edit">Rating: </label>
						<input type="text" name="title-edit" class="title-edit-input" value="${bookmark.rating}" />
						<br>
						<label for="title-edit">Description: </label>
						<input type="text" name="title-edit" class="title-edit-input" value="${bookmark.desc}" />
					</form>
				</div>
				<a target="_blank" href="${bookmark.url}">Visit Site: ${bookmark.url}</a>
				<br>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
				<button class="view-button-expanded">
					<span class="view-button-label">condense</span>
				</button>
		</li>`;
		} else { 		
			console.log('bookmark created');
			bookmarkTemplate = `
			<li class="js-bookmark" data-item-id="${bookmark.id}">
				<div class="js-bookmark-not-button">
					Title: ${bookmark.title} 
					<br>
					Rating: ${bookmark.rating}
				</div>
				<button class="delete-button">
					<span class="button-label">remove</span>
				</button>
				<button class="view-button">
					<span class="view-button-label">expand</span>
				</button>
			</li>`;
		}
	
		return bookmarkTemplate;
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
			api.deleteB(dataId, function() {
				store.findAndDelete(dataId);
				render();
			});
		});
	}
	
	function handleClickCondensed() {
		//bookmarks.condensed = false
		$('#bookmark-list').on('click', '.view-button', e => {
			console.log('bookmark clicked to uncondense');
			const dataId = getItemIdFromElement(e.target);
			let bookmark = store.findById(dataId);
			bookmark.condensed = false;
			render();
		});
		$('#bookmark-list').on('click', '.view-button-expanded', e => {
			console.log('bookmark clicked to condense');
			const dataId = getItemIdFromElement(e.target);
			let bookmark = store.findById(dataId);
			bookmark.condensed = true;
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