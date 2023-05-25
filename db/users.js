const { MONGODB } = require('../utils/constants');
const { getDatabase } = require('./mongoClient');

/**
 * Get users
 * @returns {Promise<Object[]>} the users array
 */
const getUsers = async () => {
    const db = getDatabase();
    const collection = await db.collection(MONGODB.COLLECTION.USERS);
    const query = { };
    const options = {
      projection: {
        _id: 0,
        name: 1,
        lastname: 1,
      },
    };
  
    return collection.find(query, options).toArray();
  };
  
  module.exports = {
    getUsers,
  };
  