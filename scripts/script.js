const bookTable = document.querySelector('#booktable');
const bookTableBody = document.querySelector('#booktable > tbody');
const openAddBook = document.querySelector('#openaddbook');
const closeSideForm = document.querySelector('.closebtn');
const addBookForm = document.querySelector('#addbook');

function Book(title, author, pages, read) {
  this.id = uuid();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${
    this.read ? 'read' : 'not read yet'
  }`;
};

Book.prototype._fields = function () {
  return {
    id: this.id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read,
  };
};

let library = [
  // new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
  // new Book('Starsight', 'Brandon Sanderson', 325, false),
  // new Book(
  //   'The 7 1/2 deaths of Evelynn Hardcastle',
  //   'Stuart Turton',
  //   429,
  //   true
  // ),
  // new Book('Recursion', 'Blake Crouch', 329, true),
  // new Book('Rhythm of War', 'Brandon Sanderson', 1232, true),
];

/**
 * helper function to instantiate the localstorage
 * @param {Array of Book objects} library
 */
function populateLocalStorage(library) {
  for (let entry of library) {
    localStorage.setItem(entry.id, JSON.stringify(entry._fields()));
  }
}

function loadDataFromLocalStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      console.log(localStorage[localStorage.key(i)]);
      let record = JSON.parse(localStorage[localStorage.key(i)]);
      library.push(new Book(record.title, record.author, record.pages, record.read));
    }
  }
}

/**
 * Function to add a new entry into the library
 * @param {String} title
 * @param {String} author
 * @param {Number} pages
 * @param {Boolean} read
 */
function addBookToLibrary(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
}

/**
 * Show the contents of the library by populating the table
 * @param {Array} books
 */
function showLibrary(books) {
  books.forEach((book) => {
    // console.log(book.info());
    const trow = document.createElement('tr');
    for (let field of Object.keys(book._fields())) {
      if (field === 'id') {
      } else {
        const td = document.createElement('td');
        td.textContent = book[field];
        trow.appendChild(td);
      }
    }
    bookTableBody.appendChild(trow);
  });
}

/**
 * Clear and empty the table body
 */
function clearTable() {
  console.log(bookTable.childNodes);
  const rows = document.querySelectorAll('#booktable > tbody > tr');
  console.log(rows);
  for (let i = 0; i < rows.length; i++) {
    bookTableBody.removeChild(rows[i]);
  }
}

/**
 * Methods to open and close the side panel
 */
openAddBook.addEventListener('click', (e) => {
  document.querySelector('#bookpanel').style.width = '320px';
});

closeSideForm.addEventListener('click', (e) => {
  document.querySelector('#bookpanel').style.width = '0px';
});

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  // console.log(title, author, pages, read);

  addBookToLibrary(title, author, pages, read);
  // make sure the table is cleared.
  clearTable();
  showLibrary(library);
});

loadDataFromLocalStorage();
// Populate the table
showLibrary(library);
// populateLocalStorage(library);

/**
 * Helper function to generate a UUID
 * @returns a unique 128bit identifier
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let rnd = (Math.random() * 16) | 0;
    let v = c === 'x' ? rnd : (rnd & 0x3) | 0x8;
    return v.toString(16);
  });
}
