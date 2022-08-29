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
    //password: 'C0nsc!0u5C0d!ng2022',
    password: '',
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

// Add cohort
router.get('/add', (req, res) => {
    res.render('add-cohort')
})

/**
 * Create New Item
 *
 * @return response()
 */
router.post('/add', (req, res) => {
    let data = { name: req.body.name };
    let sqlQuery = "INSERT INTO cohorts SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect("/cohorts");
        }
    });
});


/**
 * Get All Items
 *
 * @return response()
 */
router.get('/', (req, res) => {
    let sqlQuery = "SELECT * FROM cohorts";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('list-cohorts', { cohorts: results });
    });
});

router.get('/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sqlQuery = "SELECT * FROM cohorts";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


/**
 * Get Single Item
 *
 * @return response()
 */
router.get('/:id', (req, res) => {
    res.render('show-cohort', { cohortId: req.params.id });
});


// Individual cohort.
router.get('/api/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let sqlQuery = `
SELECT *
FROM conscious_coding.cohorts
WHERE conscious_coding.cohorts.id = ` + req.params.id + ";";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;

        res.json(results);
    });
})


/**
 * Get All User From a Cohort
 *
 * @return response()
 */
router.get('/:id/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sqlQuery = "SELECT * FROM users WHERE cohort_id=" + req.params.id;
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * Cohort Users Public Links
 *
 * @return response()
 */
router.get('/:id/public-links', (req, res) => {
    let sqlQuery = "SELECT * FROM users WHERE cohort_id =" + req.params.id;
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('public-link-users', { cohort_users: results });
    });
});

/**
 * Update Item
 *
 * @return response()
 */
router.put('/:id', (req, res) => {
    let sqlQuery = "UPDATE cohorts SET game_type='" + req.body.game + "' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('index');
    });
});

module.exports = router