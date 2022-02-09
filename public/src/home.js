function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    if (book.borrows[0].returned == false) count++;
    return count;
  }, 0);
}

function getMostCommonGenres(books) {
  //Keeps count of how many books per genre via object, example: { Horror: 2, Romance: 1}
  let genreList = books.reduce((result, book) => {
    (result[book.genre]) ? result[book.genre]++ : result[book.genre] = 1;
    return result;
  }, {});
  let unsortedList = [];
  //converts genreList object into an array of individual genres as objects
  for (let genre in genreList) {
    unsortedList.push({ name: genre, count: genreList[genre] })
  }
  const sortedGenreList = sortDescending(unsortedList);
  const compactList = getTopFive(sortedGenreList);
  return compactList;
}

function getMostPopularBooks(books) {
  //Keeps count of how many borrows per book via object, example: { "Lorem": 2, "Ipsum": 1}
  let bookCountObj = {};
  for (let book of books) {
    bookCountObj[book.title] = book.borrows.length;
  }
  let unsortedList = [];
  //converts bookCountObj object into an array of individual books and their counts as objects
  for (let book in bookCountObj) {
    unsortedList.push({ name: book, count: bookCountObj[book] });
  }
  const sortedBookPopularity = sortDescending(unsortedList);
  const compactList = getTopFive(sortedBookPopularity);
  return compactList;
}

function getMostPopularAuthors(books, authors) {
  //Keeps count of how many borrows per author via object, example: { "William": 23, "Halbert": 11}
  let authorCountObj = books.reduce((result, book) => {
    result[book.authorId]
      ? (result[book.authorId] += book.borrows.length)
      : (result[book.authorId] = book.borrows.length);
    return result;
  }, {});
  let unsortedList = [];
  //converts authorCountObj object into an array of individual authors and their total count as objects
  for (let authorId in authorCountObj) {
    let authorFirstName = authors.find((author) => author.id == authorId).name
      .first;
    let authorLastName = authors.find((author) => author.id == authorId).name
      .last;
    unsortedList.push({
      name: `${authorFirstName} ${authorLastName}`,
      count: authorCountObj[authorId],
    });
  }
  sortedAuthorPopularity = sortDescending(unsortedList);
  compactList = getTopFive(sortedAuthorPopularity);
  return compactList;
}

//Custom function: sorts the array by descending order (must have count property to use)
const sortDescending = list => list.sort((a, b) => (a.count < b.count) ? 1 : -1);

//Custom function: returns first 5 elements of an array
const getTopFive = list => list.slice(0, 5);

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
