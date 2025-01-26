// Select DOM elements
const form = document.getElementById('bookmark-form');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const bookmarksList = document.getElementById('bookmarks');

// Load bookmarks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadBookmarks);

// Form submission event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (!title || !url) {
        alert('Please provide a valid title and URL!');
        return;
    }

    addBookmark(title, url);
    titleInput.value = '';
    urlInput.value = '';
});

// Add a bookmark
function addBookmark(title, url) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push({ title, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

// Display all bookmarks
function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            <button onclick="deleteBookmark(${index})">Delete</button>
        `;
        bookmarksList.appendChild(li);
    });
}

// Delete a bookmark
function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

// Initial load of bookmarks
function loadBookmarks() {
    displayBookmarks();
}
