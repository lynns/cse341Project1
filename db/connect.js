const dotenv = require('dotenv');
dotenv.config();
const mongoClient = require('mongodb').MongoClient;

const mongoURL = process.env.MONGODB_URI;

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    mongoClient.connect(mongoURL)
        .then(client => {
            _db = client;
            console.log('DB Initialized.')
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};