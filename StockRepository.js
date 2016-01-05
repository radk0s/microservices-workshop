const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/book_inventory_service';

const dbClient = MongoClient.connect(url);
module.exports = {
    getAvailability(isbn){
        return dbClient
            .then(db => db.collection('books').findOne({isbn: isbn}))
            .then(res => res.count)
    },
    getBooks() {
        return dbClient
            .then(db => db.collection('books').find({}).toArray())
    },
    saveBook(book){
        return dbClient
            .then(db => db.collection('books').updateOne({isbn: book.isbn}, book, {upsert: true}));
    }
}

