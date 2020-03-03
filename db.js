 var mariadb = require('mariadb');
exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
    pool: null,
    mode: null
};

exports.connect = function (mode, done) {
    state.pool = mariadb.createPool({
        socketPath: '/var/run/mysqld/mysqld.sock',
        user: 'root',
        password: '1234',
        database: 'KeyTrader'
    });

    state.mode = mode;
    done();
};

exports.get = function () {
    return state.pool;
};
//GET all users
exports.getUsers = function (successCb, errCb) {
    var sql = "SELECT * FROM Users;";
    this.get().query(sql).then(successCb).catch(errCb);
}
//Create a User
exports.createUser = function (userName, successCb, errCb){
    var sql = "INSERT INTO Users(User_Name) values(?);";
    this.get()
    .query(
        {sql: sql},
        [userName]
    )
    .then(successCb)
    .catch(errCb);

}
//Add a Game key
exports.addKey= function (key, successCb, errCb) {
    var sql = "INSERT INTO Game_keys(U_ID, Server_ID, Key_type, Key_string) values(?, ?, ?, ?);";
    this.get()
        .query(
            {sql:sql},
            [key.U_ID, key.Server_ID, key.Key_type, key.Key_string]
        )
        .then(successCb)
        .catch(errCb);
}
//Get from key to server
exports.getLocationofKey = function(keyName, successCb, errCb){
    var sql = "SELECT Server_ID FROM Game_Keys WHERE Key_string = ?;";
    this.get()
    .query(
        {sql: sql},
        [keyName]
    )
    .then(successCb)
    .catch(errCb);

}

//See all game keys from a server
exports.getKeys = function (serverIDCheck,successCb, errCb) {
    var sql = "SELECT * FROM Game_Keys WHERE Server_ID = ?;";
    this.get()
        .query(
            {sql: sql},
            [serverIDCheck]
        )
        .then(successCb)
        .catch(errCb);
}

//Delete a key
exports.deleteKey = function (idToDelete, successCb, errCb) {
    var sql = "DELETE FROM Game_Keys WHERE Key_string = ?;";
    this.get()
        .query(
            {sql: sql},
            [idToDelete]
        )
        .then(successCb)
        .catch(errCb);
}