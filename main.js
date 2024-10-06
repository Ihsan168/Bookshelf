// Variabel untuk menyimpan data buku
let books = [];

// buku di localstorage
function loadFromLocalStorage() {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks) {
    books = storedBooks;
  }
}

// Save buku di localstorage
function saveToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Fungsi untuk menampilkan buku di halaman
function displayBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  // Kosongkan daftar sebelum menampilkan
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  // Menampilkan setiap buku
  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
        <button data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;

    // Menambahkan event listener untuk tombol
    bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
      book.isComplete = !book.isComplete; // Toggle status
      saveToLocalStorage(); // Save to localStorage
      displayBooks(); // Refresh tampilan
    });

    bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
      books = books.filter(b => b.id !== book.id); // Hapus buku
      saveToLocalStorage(); // Save to localStorage
      displayBooks(); // Refresh tampilan
    });

    bookItem.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => {
      alert('Fitur edit belum diimplementasikan.'); 
    });

    // Masukkan buku ke dalam daftar yang sesuai
    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}

// Fungsi untuk menambahkan buku baru
function addBook(event) {
  event.preventDefault(); // Mencegah reload halaman
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = Number(document.getElementById('bookFormYear').value); 
  const isComplete = document.getElementById('bookFormIsComplete').checked;
  const id = new Date().getTime(); // Menggunakan timestamp sebagai ID unik

  const newBook = {
    id,
    title,
    author,
    year, 
    isComplete
  };

  books.push(newBook); // Menambahkan buku ke array
  saveToLocalStorage(); // Save to localStorage
  displayBooks(); // Menampilkan buku
  document.getElementById('bookForm').reset(); // Reset form
}


// Event listener untuk form penambahan buku
document.getElementById('bookForm').addEventListener('submit', addBook);

// Fungsi pencarian buku
function searchBook(event) {
  event.preventDefault(); // Mencegah reload halaman
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  const searchYear = document.getElementById('searchBookYear')?.value; 

  // Filter buku berdasarkan judul dan tahun
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTitle) || 
    (searchYear && book.year === Number(searchYear))
  );
  
  // Kosongkan daftar
  document.getElementById('incompleteBookList').innerHTML = '';
  document.getElementById('completeBookList').innerHTML = '';

  // Menampilkan buku yang difilter
  filteredBooks.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
        <button data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;

    if (book.isComplete) {
      document.getElementById('completeBookList').appendChild(bookItem);
    } else {
      document.getElementById('incompleteBookList').appendChild(bookItem);
    }
  });
}


// Event listener untuk form pencarian buku
document.getElementById('searchBook').addEventListener('submit', searchBook);

// Initial load
loadFromLocalStorage();
displayBooks(); // Display loaded books
