var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
// 192.168.58.128/api/users/
router.get('/', function(req, res, next) {

  db.getUsers(function (results) {
    res.status(200).json(results);
    console.log(results);
  }, function (err) {
    res.status(500).json(err);
  });
});

module.exports = router;
