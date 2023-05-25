const { getUsers } = require('../db/users');

module.exports.findUsers = async () => {
    return await getUsers();
}