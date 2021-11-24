const bookTable = document.querySelector('#booktable');
const bookTableBody = document.querySelector('#booktable > tbody');
const openAddBook = document.querySelector('#openaddbook');
const closeSideForm = document.querySelector('.closebtn');
const addBookForm = document.querySelector('#addbook');

function Book(title, author, pages, read) {
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
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read,
    }
}

let library = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
  new Book('Starsight', 'Brandon Sanderson', 325, false),
  new Book(
    'The 7 1/2 deaths of Evelynn Hardcastle',
    'Stuart Turton',
    429,
    true
  ),
  new Book('Recursion', 'Blake Crouch', 329, true),
  new Book('Rhythm of War', 'Brandon Sanderson', 1232, true),
];
// const newBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// console.log(newBook.info());

function addBookToLibrary(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));    
}

function showLibrary(books) {
    books.forEach((book) =>{
        console.log(book.info());   
        const trow = document.createElement('tr');
        for(let field of Object.values(book._fields())){
            const td = document.createElement('td');
            td.textContent = field;
            trow.appendChild(td);
        }
        bookTableBody.appendChild(trow);        
    }); 
}

function clearTable() {
  console.log(bookTable.childNodes); 
  const emptyBody = document.createElement('tbody');
  bookTable.replaceChild(emptyBody, bookTableBody);
}

/**
 * Methods to open and close the side panel
 */
openAddBook.addEventListener('click', (e) => {
    document.querySelector('#bookpanel').style.width = '320px';
});

closeSideForm.addEventListener('click', (e) => {
    document.querySelector('#bookpanel').style.width = '0px';
})

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  // console.log(title, author, pages, read);

  addBookToLibrary(title, author, pages, read);
  // console.log(library);
  clearTable();
  showLibrary(library);
})


showLibrary(library);


