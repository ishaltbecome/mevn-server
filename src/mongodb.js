const mongodb = require('mongodb');

const mongoClient = new mongodb.MongoClient(process.env.DB_URI);

module.exports = mongoClient;
