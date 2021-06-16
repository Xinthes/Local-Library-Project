const { getMostPopularBooks } = require("./home");

function findAccountById(accounts, id) {
  return accounts.find((user) => user.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        acc++;
      }
    });
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let accId = account.id;
  let checkedOut = books.filter((book) =>
    book.borrows.find(
      (borrow) => borrow.returned == false && borrow.id == accId
    )
  );
  return checkedOut.map((book) => {
    return {
      ...book,
      author: authors.find((author) => book.authorId == author.id),
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
