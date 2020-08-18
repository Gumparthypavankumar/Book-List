//Book class for representing a book
class Book {
    constructor(title, author, bookid) {
        this.title = title;
        this.author = author;
        this.bookid = bookid;
    }
}

//UI class for all the user interface
class UI {
    static showBooks(books) {
        if (books.length > 0) {
            const show = document.querySelector('#book-List');
            books.forEach((book) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.bookid}</td>
                        <td class="btn-danger sm text-center"><a href="#" class="delete  text-light">X</a></td>
            `;
                show.appendChild(row);
            });
        }
    }
    static addBook(title, author, bookid) {
        if (title === '' || author === '' || bookid === '') {
            UI.showAlert("Please fill in all fields", "danger");
        }
        else {
            const book = new Book(title, author, bookid);

            UI.showAlert("Added Book", "success");

            Store.addBooks(book);

            const show = document.querySelector('#book-List');
            const row = document.createElement('tr');
            row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.bookid}</td>
                        <td class="btn-danger sm text-center"><a href="#" class="delete  text-light">X</a></td>
            `;
            show.appendChild(row);

            UI.clearFields();
        }
    }
    static clearFields() {
        document.querySelector('#form-book').reset();
    }

    static showAlert(message, classname) {
        const div = document.createElement('div');
        div.className = `alert alert-${classname}`;
        div.innerHTML = message;
        const form = document.getElementById('form-book');
        document.querySelector('.container').insertBefore(div, form);
        setTimeout(() => {
            div.remove();
        }, 2000);
    }

    static removeBook(target) {
        if (target.classList.contains('delete'))
            target.parentElement.parentElement.remove();
    }
}

//Store class for storage

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null)
            books =[];
        else
            books = JSON.parse(localStorage.getItem('books'));
        return books;
    }
    static addBooks(book) {
        const books = JSON.parse(localStorage.getItem('books'));
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(bookidis)
    {
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.bookid == bookidis)
            {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
// Event: showBooks

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    UI.showBooks(Store.getBooks());
});

//Event : Add Book
document.querySelector('#form-book').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const bookid = document.querySelector('#bookId').value;
    UI.addBook(title, author, bookid);
});

//Event: Remove Book

document.querySelector('#book-List').addEventListener('click', (e) => {
    UI.removeBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});