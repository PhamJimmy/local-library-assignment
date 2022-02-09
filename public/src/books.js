function findAuthorById(authors, id) {
  return authors.find(author => author.id == id);
}

function findBookById(books, id) {
  return books.find(book => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  //The borrows array's first transaction is the latest transaction. False = no returned. Everything else beforehand should be true.
  const borrowedBooks = books.filter(book => book.borrows[0].returned == false);
  const returnedBooks = books.filter(book => book.borrows[0].returned == true);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  //via reduce method
  // const borrowersFirstTen = book.borrows.slice(0, 10);
  // return borrowersFirstTen.reduce((result, borrower) => {
  //   //finds specific account by id and saves the account object to a variable
  //   let filteredAccount = accounts.find((account) => account.id === borrower.id);
  //   //Checks if book is returned and adds that property to the account object
  //   if (checkIfBookReturnedByAccount(book, filteredAccount)) {
  //     filteredAccount.returned = true;
  //   } else {
  //     filteredAccount.returned = false;
  //   }
  //   result.push(filteredAccount);
  //   return result;
  // }, []);

  //via map method
  return book.borrows.map(book => {
    //Checks for matching account via account id
    let currentAccount = accounts.find(account => account.id === book.id);
    //Spread operator to help reassign old contents plus new returned property
    currentAccount = { ...currentAccount, returned: book.returned };
    return currentAccount
  }).slice(0,10); /*Keeps only first 10 results, can probably make this more efficient by splicing the array in the beginning so there is initially less data to work with*/
}

//Helper function to check if a specific account has returned a specific book
function checkIfBookReturnedByAccount(book, account) {
  return book.borrows.find(borrowed => borrowed.id == account.id).returned;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
