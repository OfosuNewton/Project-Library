    // creating an empty array
        const myLibrary = [];
        const book_title = document.querySelector('#title');
        const a_name = document.querySelector("#author");

        //Creating a Book class instead of a plain constructor
        class Book {
            constructor (title,author,pages,status) {
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.status = status;
                this.uuid = crypto.randomUUID();
            };
        }; 
                
       // 1. Prototype method to toggle status
            Book.prototype.changeStatus = function(statusElement) {
        // 'this' is the specific Book object (thanks to .bind)
            if (this.status === 'Read') {
                this.status = 'Unread';
                statusElement.textContent = 'Status: Unread';
            } else {
                this.status = 'Read';
                statusElement.textContent = 'Status: Read';
        };
    };

        // Function to create book Object and push to myLibrary array
        function addBookToLibrary(title,author,pages,status) {
            let book = new Book(title,author,pages,status);
            myLibrary.push(book); 
        };
        // function to delete Book from the array and the display as well
          function delete_card() {
           const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
            button.addEventListener('click',(event) => {
                //Get the book's uuid from the button that was clicked
                const bookIdToDelete = event.target.getAttribute('data-book-id');
                //Find the index of the book object in the mylibarary array
                const indexToDelete = myLibrary.findIndex(book => book.uuid === bookIdToDelete);
                if(indexToDelete > -1) {
                    //delete the book object from the mylibrary array using its index
                    myLibrary.splice(indexToDelete, 1);
                    //Remove the card from the DOM (the Screen)
                    const cardToRemove = event.target.closest('.card');
                    if(cardToRemove) {
                        cardToRemove.remove()
                    };
                }; 
            });   
       });
    };
        // function to display book cards on screen
        function displayOnScreen() {
            // Get the newly added book object
            const item = myLibrary[myLibrary.length - 1]; 
            const box = document.querySelector('.card-container');
            const state_check = document.querySelector('#state-check');
            // Determine initial status text from the checkbox using the tenary operator
            const initialStatus = state_check.checked ? 'Read' : 'Unread';
            item.status = initialStatus; // Ensure tahe JS object's status is set correctly
            let card = document.createElement('div');
            card.classList.add('card');
            // 2. Add the button and status class to the innerHTML
            card.innerHTML = `<div>Title: ${item.title}</div>
                            <div>Author: ${item.author}</div>
                            <div>Pages: ${item.pages}</div>
                            <div class="book-status">Status: ${initialStatus}</div>
                            <button class="status-btn" data-book-id="${item.uuid}">Change Status</button>
                            <button class="delete-btn" data-book-id="${item.uuid}">Delete</button>`
            box.appendChild(card);
            // 3. Find the newly created button and status element on the card
            const statusButton = card.querySelector('.status-btn');
            const statusTextElement = card.querySelector('.book-status');
            // 4. THE KEY STEP: Attach the Prototype Function
            // We bind the changeStatus function to:
            // a) The specific book instance ('item') -> This sets 'this' correctly.
            // b) The HTML element ('statusTextElement') -> This is passed as the argument.
            const boundChangeStatus = item.changeStatus.bind(item, statusTextElement);
            // Attach the bound function as the event listener
            statusButton.addEventListener('click', boundChangeStatus);
            delete_card(); 
}

// NOTE: You must also update your addBookToLibrary function
function addBookToLibrary(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book); 
}



     // selectors to select what we want to work with
        const openButton = document.querySelector("[data-open-modal]")
        const modal = document.querySelector('[data-modal]')   
         // Event listener for the open button
        openButton.addEventListener('click', () => {
            modal.showModal()
        });
      
      
         

    const add = document.querySelector(".perform-click-operation");
            add.addEventListener('click',function(e)  { 
                if (book_title.checkValidity() && a_name.checkValidity()) {
                    addBookToLibrary(title.value,author.value,pages.value,null);
                    displayOnScreen()
                };
                validate();
        });

        // Added feature book form validation
        function validate() {
            book_title.addEventListener("invalid", () => {
                showError();
            });
                book_title.addEventListener("input", () => {
                book_title.setCustomValidity("");
            });
            a_name.addEventListener("invalid", () => {
                showError();
            });
            a_name.addEventListener("input", () => {
                a_name.setCustomValidity("");
            });
        };

        // a function to throw out errorw
        function showError() {
            if (book_title.validity.valueMissing) {
                book_title.setCustomValidity("I am expecting a text please!");
            };
            if (a_name.validity.valueMissing) {
                a_name.setCustomValidity("The Author will be very Happy to see his/her name!")
            } 
            if (a_name.validity.tooShort) {
                a_name.setCustomValidity("Name too short try entering full name!")
            };
        };

       

      