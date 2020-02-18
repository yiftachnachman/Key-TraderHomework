
const mariadb = require('mariadb');

console.log('May Node be with you')
const express = require('express');
const app = express();

app.listen(3000, function() {
	console.log('listening on 3000')
})


const pool = mariadb.createPool({host: "localhost", user: "root", password:"1234", connectionLimit: 5});
pool.getConnection()
    .then(conn => {
		console.log("You are connected to the database!")
    //   conn.query("")
    //     .then(rows => { // rows: [ {val: 1}, meta: ... ]
    //       return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //     })
    //     .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //       conn.release(); // release to pool
    //     })
    //     .catch(err => {
    //       conn.release(); // release to pool
    //     })
        
    }).catch(err => {
      //not connected
    });