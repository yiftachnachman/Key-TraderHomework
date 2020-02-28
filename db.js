  
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
    var sql = "INSERT INTO Users(User_Name) values(?);"
    this.get()
    .query(
        {sql: sql},
        [userName]
    )
    .then(successCb)
    .catch(errCb);

}
}
//Add a Game key
exports.addKey= function (postToInsert, successCb, errCb) {
    var sql = "INSERT INTO Game_keys(Server_ID, Key_type, Key_string) values(:Server_ID,:Key_type,:Key_string);";

    this.get()
        .query(
            {namedPlaceholders: true, sql:sql},
            postToInsert
        )
        .then(successCb)
        .catch(errCb);
}
//Get from key to server
exports.getLocationofKey = function(keyName, successCb, errCb){
    var sql = "SELECT Server_ID FROM Game_Keys WHERE Key_string = ?;"
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

//Delete a post
exports.deleteKey = function (idToDelete, successCb, errCb) {
    var sql = "DELETE FROM Game_Keys WHERE Key_string = ?;";
    this.get()
        .query(
            sql,
            [idToDelete]
        )
        .then(successCb)
        .catch(errCb);
}