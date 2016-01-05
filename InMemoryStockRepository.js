
var state = [];

module.exports = {
    getAvailability(isbn){
        return new Promise((resolve, reject) => {
            const item = state.find(item => item.isbn == isbn);
            if(item) {
                resolve(item.count)
            } else {
                reject()
            }
        });
    },
    getBooks() {
        return Promise.resolve(state)
    },
    saveBook(book){
        const bookIndex = state.findIndex(item => item.isbn == book.isbn);
        if(bookIndex == -1) {
            state.push(book)
        } else {
            state[bookIndex].count = book.count;
        }
        return Promise.resolve()
    }
}

