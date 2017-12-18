function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}. ${this.pages} pages. You have ${this
    .read
    ? ""
    : "not "}read this book.`;
};

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

addBookToLibrary(new Book("The Hobbit", "J.R.R Tolkien", 295, false));
addBookToLibrary(new Book("American Gods", "Neil Gaiman", 545, true));

function renderLibrary() {
  const bookList = document.querySelector("#book-list");
  bookList.innerHTML = "";
  const books = myLibrary.map((book, index) => createBookCard(book, index));
  books.forEach(book => bookList.appendChild(book));
}

function createBookCard(book, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;
  card.textContent = book.info();

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.style = "--button-background: var(--danger-color)";
  deleteButton.onclick = () => {
    removeBookFromLibrary(index);
    renderLibrary();
  };
  buttons.appendChild(deleteButton);

  const readButton = document.createElement("button");
  readButton.textContent = book.read ? "I didn't read it!" : "I read it!";
  readButton.onclick = () => {
    book.toggleRead();
    renderLibrary();
  };
  buttons.appendChild(readButton);

  card.appendChild(buttons);

  return card;
}

const form = document.querySelector("#newbook");
form.onsubmit = function(e) {
  e.preventDefault();
  const { title, author, pages, read } = form;
  console.log(read.value);
  addBookToLibrary(
    new Book(
      title.value,
      author.value,
      pages.value,
      read.value === "true" ? true : false
    )
  );
  renderLibrary();
  toggleNewBookForm();
};

const addBookButton = document.querySelector("#new-book-button");
addBookButton.onclick = toggleNewBookForm;

function toggleNewBookForm() {
  const formComponent = document.querySelector("#new-book-form");
  const shader = document.querySelector(".body-shader");
  formComponent.classList.toggle("visible");
  shader.classList.toggle("visible");
}

renderLibrary();
