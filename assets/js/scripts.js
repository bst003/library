/*
Create an array to hold the book objects
Create a constructor to create the book objects
Create a function to add the books the the library
Create a function to add the books to the page
Create a function to delete books from the page using a button
Create a function to toggle the read status of the book using a button
*/

let myLibrary = [];


function Book(name, author, pages, status) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.status = status;
}


function displayLibraryItems(array){

    const tableBody = document.querySelector('#library-items tbody');

    array.forEach( (book, index) => {

        let row = document.createElement('tr');
        row.setAttribute('data-index', index);

        for (let prop in book){

            let cell = document.createElement('td');
            cell.innerText = book[prop];

            row.appendChild(cell);

        }

        tableBody.appendChild(row);

    });

}


function addBookToLibrary(object) {
    myLibrary.push(object);
}


let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 304, 'read');
addBookToLibrary(theHobbit);

let moscow = new Book('A Gentleman in Moscow', 'Amor Towles', 462, 'read');
addBookToLibrary(moscow);

let emma = new Book('Emma', 'Jane Austen', 1036, 'not read');
addBookToLibrary(emma);

displayLibraryItems(myLibrary);

console.table(myLibrary);