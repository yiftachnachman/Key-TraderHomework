var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* CREATE (Post)*/
var mariadb = "INSERT INTO tableName (column_1, column_2, ... ) VALUES (value1, value2, ... );";   

/* READ (Get)*/
var mariadb = "SELECT * FROM ??; ";
var inserts = ['Users'];
mariadb = maria.format(mariadb, inserts);
db.get().query(mariadb, function(error, result) {
  if (error){
    callback(error);
  }
  console.log("POST: " + JSON.stringify(result));
}
/* UPDATE (Patch) */

/* DELETE (Delete) */

/* Example for help
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
*/