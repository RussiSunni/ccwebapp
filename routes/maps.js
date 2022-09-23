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
 * Get All Items
 *
 * @return response()
 */
router.get('/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sqlQuery = "SELECT * FROM maps";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
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
 * Get Single Item
 *
 * @return response()
 */
router.get('/show/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let sqlQuery = `
    SELECT *
    FROM conscious_coding.maps
    WHERE conscious_coding.maps.id = ` + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});



/**
 * Create New Item
 *
 * @return response()
 */
router.post('/add', (req, res) => {
    var name;
    var tiles;
    var positions;

    name = req.body.name;
    tiles = req.body.tiles;
    positions = req.body.positions;

    const mapJSON = { elements: tiles, positions: positions };
    var mapJSONString = JSON.stringify(mapJSON);

    console.log(mapJSON);
    let data = { name: name, data: mapJSONString };
    let sqlQuery = "INSERT INTO maps SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect("/index");
        }
    });
});




module.exports = router