const bookTable = document.querySelector('#booktable');
const bookTableBody = document.querySelector('#booktable > tbody');
const openAddBook = document.querySelector('#openaddbook');
const closeSideForm = document.querySelector('.closebtn');
const addBookForm = document.querySelector('#addbook');
const deleteModal = document.querySelector('#deletemodal');
const cancelModalButton = document.querySelector('#modalcancel');
const deleteRecordModalButton = document.querySelector('#modaldelete');



function Book(id = uuid(), title, author, pages, read) {
  this.id = id;
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

Book.prototype.unread = function () {
  this.read = !this.read;
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

/**
 * Load data from localStorage if they exist for our page
 */
function loadDataFromLocalStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      // console.log(localStorage[localStorage.key(i)]);
      let record = JSON.parse(localStorage[localStorage.key(i)]);
      library.push(
        new Book(
          record.id,
          record.title,
          record.author,
          record.pages,
          record.read
        )
      );
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
  // Initiate a new book instance
  const newBook = new Book(uuid(), title, author, pages, read);
  // add the new book to the library array
  library.push(newBook);
  // extract a JSON record of the new book
  let record = JSON.stringify(newBook._fields());
  // Add the book to the local storage
  localStorage.setItem(newBook.id, record);
}

/**
 * Show the contents of the library by populating the table
 * @param {Array} books
 */
function showLibrary(books) {
  books.forEach((book) => {
    // console.log(book.info());
    const trow = document.createElement('tr');
    let id;
    for (let field of Object.keys(book._fields())) {
      if (field === 'id') {
        trow.setAttribute('data-id', book[field]);
        id = book[field];
      } else if (field === 'read') {
        const td = document.createElement('td');
        td.innerHTML =
          book[field] === false
            ? `<button data-id=${id} class="readbtn">Read</button>`
            : `<button data-id=${id} class="readbtn">Unread</button>`;
        trow.appendChild(td);
      } else {
        const td = document.createElement('td');
        td.textContent = book[field];
        trow.appendChild(td);
      }
    }
    // Adding the delete button
    const deleteButton = document.createElement('span');    
    deleteButton.textContent = '✖';
    deleteButton.className = 'deletebtn';
    deleteButton.setAttribute('data-id', id);  

    deleteButton.addEventListener('click', (e) => {
      // console.log(e.target.dataset.id);
      openModal(e.target.dataset.id);           
    });

    trow.appendChild(deleteButton);

    trow.addEventListener('mouseover', (e) => {
      deleteButton.style.display = 'inline';
    });

    trow.addEventListener('mouseout', (e) => {
      deleteButton.style.display = 'none';
    });

    bookTableBody.appendChild(trow);
  });

  const readBtn = document.querySelectorAll('.readbtn');
  readBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookToRead = books.filter(
        (b) => b._fields().id === e.target.dataset.id
      );
      bookToRead[0].unread();
      // console.log(bookToRead[0].read);
      const newValue = JSON.stringify(bookToRead[0]);
      // get data from localStorage
      localStorage.setItem(bookToRead[0].id, newValue);
      e.target.textContent = bookToRead[0].read ? 'Unread' : 'Read';
    });
  });  
}



/**
 * Clear and empty the table body
 */
function clearTable() {
  // console.log(bookTable.childNodes);
  const rows = document.querySelectorAll('#booktable > tbody > tr');
  // console.log(rows);
  for (let i = 0; i < rows.length; i++) {
    bookTableBody.removeChild(rows[i]);
  }
}

/**
 * Methods to open and close the side panel
 */
openAddBook.addEventListener('click', (e) => {
  // debugger;
  // e.preventDefault();
  let sidePanel = document.querySelector('#bookpanel');
  if(sidePanel.style.width === '0px' || sidePanel.style.width === ""){
    sidePanel.style.width = '320px';
  }
    else{
      sidePanel.style.width = '0px';
    }
});

closeSideForm.addEventListener('click', (e) => {
  document.querySelector('#bookpanel').style.width = '0px';
});

/**
 * Methods to addbook from the side form
 */
addBookForm.addEventListener('submit', (e) => {
  //disallow redirection
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

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

function openModal(targetId) {
  deleteModal.style.display = 'flex';

  deleteRecordModalButton.addEventListener('click', (e) => {
    library = library.filter((b) => b.id !== targetId);
    deleteModal.style.display = 'none';
    clearTable();
    showLibrary(library);

  });



  
}



cancelModalButton.addEventListener('click', (e) => {
  deleteModal.style.display = 'none';
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}