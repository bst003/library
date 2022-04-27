/*/////////////////////////////////////////
Global Variables
/////////////////////////////////////////*/

let myLibrary = [];
const newBookForm = document.querySelector('#new-book');


/*/////////////////////////////////////////
Functions
/////////////////////////////////////////*/


// Constructor Functions
////////////////////

function Book(name, author, pages, status) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.status = status;
}

Book.prototype.toggleMethod = function() {

    if( this.status === 'read'){
        this.status = 'not read';
    } else {
        this.status = 'read';
    }

}


// Listener Functions
////////////////////

function setupDeleteListeners() {
    const deleteRowButtons = document.querySelectorAll('.delete-item');
    deleteRowButtons.forEach( (deleteRowButton) => {

        deleteRowButton.addEventListener('click', deleteRow );
    
    });
}


function setupStatusListeners() {
    const statusToggleButtons = document.querySelectorAll('.toggle-status');
    statusToggleButtons.forEach( (statusToggleButton) => {

        statusToggleButton.addEventListener('click', toggleStatus );
    
    });
}


// Main Functions
////////////////////

function addBookToLibrary(object) {
    myLibrary.push(object);
}


function displayLibraryItems(array){

    const tableBody = document.querySelector('#library-items tbody');
    tableBody.innerText = '';

    array.forEach( (book, index) => {

        let row = document.createElement('tr');
        row.setAttribute('data-index', index);

        for (let prop in book){

            if( prop === 'toggleMethod' ){ 
                continue 
            }

            let cell = document.createElement('td');

            if( prop === 'status' ){
                let statusButton = document.createElement('button');
                statusButton.setAttribute('class', 'toggle-status');
                statusButton.innerText = book[prop];

                cell.appendChild(statusButton);
            } else {
                cell.innerText = book[prop];
            }

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

    setupDeleteListeners();
    setupStatusListeners();

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


function deleteRow(e){

    let row = e.target.parentNode.parentNode;
    let rowIndex = row.getAttribute('data-index');

    myLibrary.splice(rowIndex,1);

    displayLibraryItems(myLibrary);

}


function toggleStatus(e){

    let row = e.target.parentNode.parentNode;
    let rowIndex = row.getAttribute('data-index');

    let currentObject = myLibrary[rowIndex];

    currentObject.toggleMethod();

    displayLibraryItems(myLibrary);

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
