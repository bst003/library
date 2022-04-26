/*
Create an array to hold the book objects
Create a constructor to create the book objects
Create a function to add the books the the library
Create a function to add the books to the page
Create a function to delete books from the page using a button
Create a function to toggle the read status of the book using a button
*/

/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/

let myLibrary = [];
const newBookForm = document.querySelector('#new-book');


/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/

function Book(name, author, pages, status) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.status = status;
}


function displayLibraryItems(array){

    const tableBody = document.querySelector('#library-items tbody');
    tableBody.innerText = '';

    array.forEach( (book, index) => {

        let row = document.createElement('tr');
        row.setAttribute('data-index', index);

        for (let prop in book){

            let cell = document.createElement('td');
            cell.innerText = book[prop];

            row.appendChild(cell);

        }

        let cell = document.createElement('td');

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'delete-item alt');
        deleteButton.innerText = 'Delete';

        cell.appendChild(deleteButton);

        row.appendChild(cell);

        tableBody.appendChild(row);

    });

}


function submitNewBook(e){
    e.preventDefault();

    // get values from form fields
    let nameValue = document.querySelector('#name').value;
    let authorValue = document.querySelector('#author').value;
    let pagesValue = document.querySelector('#pages').value;
    let statusValue = document.querySelector('#status').value;

    // create object and add to library
    let newBook = new Book(nameValue, authorValue, pagesValue, statusValue);
    addBookToLibrary(newBook);

    // reset values on form
    document.querySelector('#name').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#status').value = 'read';

    // Display the new library 
    displayLibraryItems(myLibrary);
}


function addBookToLibrary(object) {
    myLibrary.push(object);
}


/*/////////////////////////////////////////
Setup and Interaction
/////////////////////////////////////////*/


let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 304, 'read');
addBookToLibrary(theHobbit);

let moscow = new Book('A Gentleman in Moscow', 'Amor Towles', 462, 'read');
addBookToLibrary(moscow);

let emma = new Book('Emma', 'Jane Austen', 1036, 'not read');
addBookToLibrary(emma);

displayLibraryItems(myLibrary);

newBookForm.addEventListener('submit', submitNewBook );

console.table(myLibrary);