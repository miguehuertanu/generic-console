const { MongoClient } = require('mongodb');
const log = require('../lib/log');
const { MONGODB } = require('../utils/constants');

let client;
let database;

const connectToMongoDB = async () => {
  if (database) {
    return database;
  }
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    database = client.db(MONGODB.DATABASE);
    return database;
  } catch (error) {
    log.error(error.message, { stack: error.stack });
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('No database found');
  }
  return database;
};

const getClient = () => {
  if (!client) {
    throw new Error('Client not instantiated');
  }
  return client;
};

module.exports = {
  connectToMongoDB,
  getDatabase,
  getClient,
};
