var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const User = {
      email: req.body.email,
      username: req.body.username,
      password: hash,
    }
    db.createUser(User, function(err){
      if(err)
      {
        res.status(500).json(err);
      }
      else{
        res.json({
          message: "User inserted!"
        });
      }
    })
  })
})

router.get("/deleteKey", (req, res) => {
  const idToDelete = req.body.key_string;
  db.deleteKey(idToDelete, function(results){
    res.status(200).json({});
  }, function (err){
    console.error(err);
    res.status(500).json({});
  });
});

router.get("/getKey", (req, res) => {
  const keyname = req.body.keyname;
  const Server_ID = req.body.Server_ID;
  db.getLocationofKey(keyname, function(results){
    res.status(200).json({});
  }, function (err){
    console.error(err);
    res.status(500).json({});
  });
  db.getKeys(server_ID, function (results){
    res.status(200).json({});
  }, function (err){
    console.error(err);
    res.status(500).json({})
  });
});

module.exports = router;