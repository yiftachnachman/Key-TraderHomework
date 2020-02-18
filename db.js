var mariadb = require('mariadb');
var async = require('async');
var PRODUCTION_DB = 'codeVidTool';
var TEST_DB = 'test_codeVidTool';
exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';
var state = {
    pool: null,
    mode: null
};
exports.connect = function (mode, done) {
    state.pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });
    state.mode = mode;
    done();
};
exports.get = function () {
    return state.pool;
};