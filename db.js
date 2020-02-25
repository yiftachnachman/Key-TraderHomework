  
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

exports.getUsers = function (successCb, errCb) {
    var sql = "SELECT * FROM Users;";
    this.get().query(sql).then(successCb).catch(errCb);
}

exports.addPost = function (postToInsert, successCb, errCb) {
    var sql = "INSERT INTO posts(title, content) values(:title,:content);";

    this.get()
        .query(
            {namedPlaceholders: true, sql:sql},
            postToInsert
        )
        .then(successCb)
        .catch(errCb);
}

exports.getAllPosts = function (successCb, errCb) {
    var sql = "SELECT * FROM posts;";

    this.get()
        .query(
            {sql: sql}
        )
        .then(successCb)
        .catch(errCb);
}

exports.deletePost = function (idToDelete, successCb, errCb) {
    var sql = "DELETE FROM posts WHERE post_id = ?;";
    this.get()
        .query(
            sql,
            [idToDelete]
        )
        .then(successCb)
        .catch(errCb);
}