function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((userA, userB) => (userA.name.last.toLowerCase() > userB.name.last.toLowerCase()) ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  //Use reduce method to keep a counter/accumulator/total
  return books.reduce((count, book) => {
    if (book.borrows.some(borrowed => borrowed.id == account.id)) {
      count++;
    }
    return count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const filtered = books.filter(book => book.borrows.some(borrowed => {
    return (borrowed.id == account.id && borrowed.returned == false);
  }));
  for (let i = 0; i < filtered.length; i++) {
    filtered[i].author = authors.find(author => author.id == filtered[i].authorId);
  }
  return filtered;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
