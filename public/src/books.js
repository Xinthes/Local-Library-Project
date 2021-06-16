function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  let bookObj = book.borrows.map((borrow) => {
    let account = accounts.find((account) => {
      return account.id === borrow.id;
    });
    return {
      id: borrow.id,
      returned: borrow.returned,
      ...account,
    };
  });
  return bookObj.slice(0, 10);
}
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
