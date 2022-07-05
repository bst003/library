/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/

let myLibrary = [];
const newBookForm = document.querySelector("#new-book");

/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/

// Constructor Functions
////////////////////

class Book {
  constructor(name, author, pages, status) {
    (this.name = name),
      (this.author = author),
      (this.pages = pages),
      (this.status = status);
  }

  toggleMethod = () => {
    if (this.status === "read") {
      this.status = "not read";
    } else {
      this.status = "read";
    }
  };
}

// Listener Functions
////////////////////

function setupDeleteListeners() {
  const deleteRowButtons = document.querySelectorAll(".delete-item");
  deleteRowButtons.forEach((deleteRowButton) => {
    deleteRowButton.addEventListener("click", deleteRow);
  });
}

function setupStatusListeners() {
  const statusToggleButtons = document.querySelectorAll(".toggle-status");
  statusToggleButtons.forEach((statusToggleButton) => {
    statusToggleButton.addEventListener("click", toggleStatus);
  });
}

// Main Functions
////////////////////

function displayLibraryItems(array) {
  const tableBody = document.querySelector("#library-items tbody");
  tableBody.innerText = "";

  array.forEach((book, index) => {
    let row = document.createElement("tr");
    row.setAttribute("data-index", index);

    for (let prop in book) {
      if (prop === "toggleMethod") {
        continue;
      }

      let cell = document.createElement("td");

      if (prop === "status") {
        let statusButton = document.createElement("button");
        statusButton.setAttribute("class", "toggle-status");
        statusButton.innerText = book[prop];

        cell.appendChild(statusButton);
      } else {
        cell.innerText = book[prop];
      }

      row.appendChild(cell);
    }

    let cell = document.createElement("td");

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-item alt");
    deleteButton.innerText = "Delete";

    cell.appendChild(deleteButton);

    row.appendChild(cell);

    tableBody.appendChild(row);
  });

  setupDeleteListeners();
  setupStatusListeners();
}

function addBookToLibrary(e) {
  e.preventDefault();

  // get values from form fields
  let nameInput = document.querySelector("#name");
  let nameValue = nameInput.value;
  if (nameInput.validity.valueMissing) {
    nameInput.nextElementSibling.innerText =
      "The book must have some sort of name, right?";
  } else if (nameInput.validity.tooShort) {
    nameInput.nextElementSibling.innerText = `The book title must be at least ${nameInput.minLength} characters long, your input is only ${nameInput.value.length}.`;
  } else if (nameInput.validity.valid) {
    nameInput.nextElementSibling.innerText = "";
  }

  let authorInput = document.querySelector("#author");
  let authorValue = authorInput.value;
  if (authorInput.validity.valueMissing) {
    authorInput.nextElementSibling.innerText =
      "This book definitely had an author";
  } else if (authorInput.validity.tooShort) {
    authorInput.nextElementSibling.innerText = `The author's name must be at least ${authorInput.minLength} characters long, your input is only ${authorInput.value.length}.`;
  } else if (authorInput.validity.valid) {
    authorInput.nextElementSibling.innerText = "";
  }

  let pagesInput = document.querySelector("#pages");
  let pagesValue = pagesInput.value;
  if (pagesInput.validity.valueMissing) {
    pagesInput.nextElementSibling.innerText =
      "This book definitely had at least 10 pages";
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesInput.nextElementSibling.innerText = `The book must be at least ${pagesInput.min} pages long, this book only has ${pagesInput.value}.`;
  } else if (pagesInput.validity.valid) {
    pagesInput.nextElementSibling.innerText = "";
  }

  let statusInput = document.querySelector("#status");
  let statusValue = statusInput.value;

  if (!nameInput.valid || !authorInput.valid || !pagesInput.valid) {
    console.log("at least one input is invalid");
    return;
  }

  // create object and add to library
  let newBook = new Book(nameValue, authorValue, pagesValue, statusValue);
  myLibrary.push(newBook);

  // reset values on form
  nameInput.value = "";
  authorInput.value = "";
  pagesInput = "";
  statusInput = "read";

  document.querySelectorAll(".error").forEach((error) => {
    error.innerText = "";
  });

  // Display the new library
  displayLibraryItems(myLibrary);
}

function deleteRow(e) {
  let row = e.target.parentNode.parentNode;
  let rowIndex = row.getAttribute("data-index");

  myLibrary.splice(rowIndex, 1);

  displayLibraryItems(myLibrary);
}

function toggleStatus(e) {
  let row = e.target.parentNode.parentNode;
  let rowIndex = row.getAttribute("data-index");

  let currentObject = myLibrary[rowIndex];

  currentObject.toggleMethod();

  displayLibraryItems(myLibrary);
}

/*/////////////////////////////////////////
Setup and Interaction
/////////////////////////////////////////*/

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 304, "read");
myLibrary.push(theHobbit);

let moscow = new Book("A Gentleman in Moscow", "Amor Towles", 462, "read");
myLibrary.push(moscow);

let emma = new Book("Emma", "Jane Austen", 1036, "not read");
myLibrary.push(emma);

displayLibraryItems(myLibrary);

newBookForm.addEventListener("submit", addBookToLibrary);
