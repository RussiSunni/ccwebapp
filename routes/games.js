// const express = require('express')
// const router = express.Router()


// const mysql = require('mysql');

// /*------------------------------------------
// --------------------------------------------
// Database Connection
// --------------------------------------------
// --------------------------------------------*/
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     //password: 'C0nsc!0u5C0d!ng2022',
//     database: 'conscious_coding'
// });

// /*------------------------------------------
// --------------------------------------------
// Shows Mysql Connect
// --------------------------------------------
// --------------------------------------------*/
// conn.connect((err) => {
//     if (err) {
//         console.log("MySQL not connected problem");
//         // throw err;
//     }
//     console.log('Mysql connected...');
// });


// /**
//  * Get All Sessions
//  *
//  * @return response()
//  */
// router.get('/', (req, res) => {
//     let sqlQuery = "SELECT * FROM games";
//     let query = conn.query(sqlQuery, (err, results) => {
//         if (err) throw err;
//         res.render('list-games', { games: results });
//     });
// });





// // Add session
// router.get('/add', (req, res) => {
//     res.render('add-game')
// })

// /**
//  * Create New Session
//  *
//  * @return response()
//  */
// router.post('/', (req, res) => {
//     let data = { name: req.body.name };
//     let sqlQuery = "INSERT INTO games SET ?";
//     let query = conn.query(sqlQuery, data, (err, results) => {
//         if (err) throw err;
//         res.send(apiResponse(results));
//     });
// });


// /**
//  * Create New Item
//  *
//  * @return response()
//  */
//  router.post('/', (req, res) => {
//     let data = { name: req.body.name, number_rounds: req.body.rounds, number_moves: req.body.turns, number_seconds: req.body.seconds, points_toggle: req.body.toggle_points, points_endpoint: req.body.endpoint_points };
//     let sqlQuery = "INSERT INTO cohorts SET ?";
//     let query = conn.query(sqlQuery, data, (err, results) => {
//         if (err) throw err;
//         res.send("cohort added");
//         res.end();
//     });
// });


// module.exports = router