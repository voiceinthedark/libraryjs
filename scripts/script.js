const bookTable = document.querySelector('#booktable');

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

function addBookToLibrary() {
    
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
        bookTable.appendChild(trow);        
    }); 

}

showLibrary(library);

