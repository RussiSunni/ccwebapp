const express = require('express')
const router = express.Router()
const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    password: 'C0nsc!0u5C0d!ng2022',
    database: 'conscious_coding'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
    if (err) {
        console.log("MySQL not connected problem");
        // throw err;
    }
    else {
        console.log('Mysql connected...');
    }
});


/**
 * Create New Item
 *
 * @return response()
 */
router.post('/add', (req, res) => {
    session = req.session;
    if (session.userid) {
        let data = {
            cohort_id: req.body.cohort_id, name: req.body.name, number_rounds: req.body.rounds, number_moves: req.body.moves,
            number_seconds: req.body.seconds, points_toggle: req.body.toggle_points,
            points_endpoint: req.body.endpoint_points, game_type: req.body.game_type, map_id: req.body.map, number_steals: req.body.steals
        };
        let sqlQuery = "INSERT INTO games SET ?";
        let query = conn.query(sqlQuery, data, (err, results) => {
            if (err) throw err;
            res.redirect('/');
        });
    }
    else {
        res.redirect('/login');
    }
});


// /**
//  * Get All Games
//  *
//  * @return response() 
//  */
// router.get('/list', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     let sqlQuery = "SELECT * FROM games";
//     let query = conn.query(sqlQuery, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

/**
 * Get One Game
 *
 * @return response() 
 */
router.get('/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sqlQuery = "SELECT * FROM games WHERE id=" + req.params.id;
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});


module.exports = router