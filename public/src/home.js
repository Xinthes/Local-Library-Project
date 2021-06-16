function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  console.log(books);
  let numOfGenres = books.reduce((acc, book) => {
    if (acc[book.genre]) {
      acc[book.genre].count++;
    } else {
      acc[book.genre] = { name: book.genre, count: 1 };
    }
    return acc;
  }, {});
  console.log(numOfGenres);
  let genres = Object.keys(numOfGenres).map((name) => numOfGenres[name]);
  console.log(genres);
  let sortedGenres = genres.sort((genreA, genreB) =>
    genreA.count < genreB.count ? 1 : -1
  );
  console.log(sortedGenres);
  return sortedGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  console.log(books);
  let popBooks = books.reduce((acc, book) => {
    if (acc[book.borrows]) {
      acc[book.borrows].count++;
    } else {
      acc[book.borrows] = { name: book.title, count: book.borrows.length };
    }
    return acc;
  }, {});
  console.log(popBooks);
  let titles = Object.keys(popBooks).map((title) => popBooks[title]);
  console.log(titles);
  let sortedBooks = titles.sort((bookA, bookB) =>
    bookA.count < bookB.count ? 1 : -1
  );
  console.log(sortedBooks);
  console.log(sortedBooks.slice(0, 5));
  return sortedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);

  let arr = sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      let name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
  console.log(arr);
  return arr;
}

/*helper function for getMostPopularAuthors*/

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);

  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
