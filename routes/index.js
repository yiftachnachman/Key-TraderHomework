var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var sql = "SELECT * FROM ?? WHERE ??=?;";
var inserts = ['users', 'username', username];
sql = mysql.format(sql, inserts);
db.get().query(sql, function (error, result) {
if (error) {
callback(error);
}
console.log("POST(select): " + JSON.stringify(result));
if (result.length !== 0) {
    userId = result[0].id;
}
else {
    userId = -1;
}
callback(null, 0);
});