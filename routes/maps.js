const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

router.use(bodyParser.json());
router.use(methodOverride('_method'));


/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'C0nsc!0u5C0d!ng2022',
    //password: '',
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
 * View item
 *
 * @return response()
 */
router.get('/map-editors/pathways-map-editor', (req, res) => {
    res.render("map-editors/pathways-map-editor");
})


/**
 * Create New Item
 *
 * @return response()
 */
router.post('/add', (req, res) => {

    let data = { name: req.body.name, data: req.body.data };
    let sqlQuery = "INSERT INTO maps SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect("/cohorts");
        }
    });
});






module.exports = router