// Select elements
var popupBox = document.getElementById("popup-box");
var overlay = document.getElementById("overlay");
var addButton = document.getElementById("add-popup-button");
var cancelButton = document.getElementById("cancel-button");
var closePopup = document.getElementById("close-popup");
var bookForm = document.getElementById("book-form");
var bookList = document.getElementById("book-list");
var emptyState = document.getElementById("empty-state");
var searchInput = document.getElementById("search-input");

// Function to show the popup
function showPopup() {
    popupBox.style.display = "block";
    overlay.style.display = "block";
}

// Function to hide the popup
function hidePopup() {
    popupBox.style.display = "none";
    overlay.style.display = "none";
    bookForm.reset(); // Clear input fields
}

// Function to add a new book
function addBook(event) {
    event.preventDefault(); // Prevent form submission
    
    var title = document.getElementById("book-title-input").value;
    var author = document.getElementById("book-author-input").value;
    var description = document.getElementById("book-description-input").value;

    if (title.trim() === "" || author.trim() === "" || description.trim() === "") {
        alert("Please fill all fields!");
        return;
    }

    // Hide empty state if it's the first book
    if (emptyState.style.display !== "none") {
        emptyState.style.display = "none";
    }

    // Create book container
    var bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    
    // Generate a random color for the book header
    var colors = [
        "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
        "linear-gradient(135deg, #f72585 0%, #b5179e 100%)",
        "linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)",
        "linear-gradient(135deg, #560bad 0%, #7209b7 100%)",
        "linear-gradient(135deg, #f77f00 0%, #d62828 100%)"
    ];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    bookDiv.innerHTML = `
        <div class="book-header" style="background: ${randomColor}">
            <h2>${title}</h2>
            <h3>by ${author}</h3>
        </div>
        <div class="book-content">
            <p>${description}</p>
        </div>
        <div class="book-actions">
            <button class="delete-button"><i class="fas fa-trash"></i> Delete</button>
        </div>
    `;

    // Add delete functionality
    bookDiv.querySelector(".delete-button").addEventListener("click", function () {
        bookDiv.remove();
        // Show empty state if no books left
        if (bookList.children.length === 1) { // Only empty state remains
            emptyState.style.display = "block";
        }
    });

    // Add book to the list
    bookList.appendChild(bookDiv);

    // Hide popup and reset form
    hidePopup();
}

// Search functionality
searchInput.addEventListener("input", function() {
    var searchTerm = this.value.toLowerCase();
    var books = document.querySelectorAll('.book');
    
    books.forEach(function(book) {
        var title = book.querySelector('h2').textContent.toLowerCase();
        var author = book.querySelector('h3').textContent.toLowerCase();
        var description = book.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm) || description.includes(searchTerm)) {
            book.style.display = 'flex';
        } else {
            book.style.display = 'none';
        }
    });
});

// Event Listeners
addButton.addEventListener("click", showPopup);
cancelButton.addEventListener("click", hidePopup);
closePopup.addEventListener("click", hidePopup);
bookForm.addEventListener("submit", addBook);
overlay.addEventListener("click", hidePopup);