const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017/';

let db;

const mongoConnect = (cb) => {

    MongoClient.connect(uri).then((client) => {

        console.log("Database connected ");

        db = client.db('E-Store');

        cb();

    })

}
const getDb = () => {
    return db
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;