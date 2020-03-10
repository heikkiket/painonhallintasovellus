var mysql = require('mysql');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');

const jwtHelper = require('./lib/jwt');

const config = require('./config.json');

const app = express();


const hashPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
};

var connection = mysql.createConnection({
    host: "localhost",
    user: "expressmysql",
    password: "UomaWoo4",
    database: "painonhallinta_db"
});

//public folder as root
app.use(express.static('wwwroot'));
//JSON parser
app.use(express.json());
//JWT middleware. Turn on to allow login.
app.use(jwtHelper());

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.append('Content-Type', 'application/json');
        res.status(401).send({error: 'Invalid token.'});
    }
});

app.use((req, res, next) => {
    res.append('Content-type', 'application/json');
    next();
});

connection.connect(function(err) {
    if (err) throw err;
    app.get(['/', '/view/:view'], function (req, res) {
        let headers = {'Content-Type': 'text/html'};
        res.sendFile(__dirname + '/wwwroot/index.html', {headers});
    });

    //MEASUREMENTS
    app.get('/measures/:userId', function (req, res) { //Hae käyttäjän 1 mittaukset
        var userId = req.params.userId;
        connection.query("SELECT * FROM measures WHERE UserId = ? ORDER BY MeasureDate DESC", [userId], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

    app.post('/measures/:userId', function (req, res) { //Lisää uusi mittaus käyttäjälle 1
        var userId = req.params.userId;
        var d = new Date();
        var todayDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() //DATE '2020-02-27'
        var weightToday = req.body.weightToday;
        var userId = req.params.userId;
        connection.query("INSERT INTO measures (MeasureDate,Weight,UserId) VALUES (DATE ?,?,?);",
                         [todayDate, weightToday, userId] , function (err, result, fields) {
                             if (err) throw err;
                             res.send();
                             console.log("Measurement was inserted: " + result);
                         });
    });

    //ACCOUNT
    app.get('/myaccount/:userId', function (req, res) { //Hae käyttäjän 1 profiilitiedot
        var userId = req.params.userId;

        if(userId == 'null') {
            res.send();
        }

        connection.query("SELECT * FROM users WHERE Id = ?", [userId], function (err, result, fields) {
            if (err) throw err;
            let {Password, ...resultWoPass} = result[0];
            console.log(resultWoPass);
            res.send(resultWoPass);
        });
    });

    app.put('/myaccount/:userId', function (req, res) { //Muokkaa käyttäjän 1 tietoja
        var userId = req.params.userId;
        var name = req.body.name;
        var height = req.body.height;
        var startingWeight = req.body.startingWeight;
        var targetWeight = req.body.targetWeight;
        connection.query(
            "UPDATE users SET UserName = ?, Height = ?, TargetWeight = ? WHERE Id = ?",
            [name, height, targetWeight, userId] ,
            function (err, result, fields) {
                if (err) throw err;
                res.send({message: "ok"});
                console.log("myaccount was updated: " + result);
            });

    });

    // LOGIN:
    app.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        const hashedPassword = hashPassword(password);

        connection.query("SELECT * from users WHERE (UserName = ? AND Password = ?)",
                         [username, hashedPassword],
                         (err, result, fields) => {
                             if (err) throw err;
                             if(result.length == 1) {
                                 const token = jwt.sign({sub: result.Id}, config.secret);
                                 const {Password, ...resultWithoutPassword} = result[0];
                                 res.send({
                                     token,
                                     resultWithoutPassword
                                 });
                             } else {
                                 res.status(403).send({Message: "Login failure"});
                             }
                         });
    });

    // USER CREATION
    app.post('/users', function (req, res) {
        console.log("Creating user");
        var name = req.body.name;
        var height = req.body.height;
        var startingWeight = req.body.startingWeight;
        var targetWeight = req.body.targetWeight;
        let password = req.body.password;
        let hashedPw = hashPassword(password);

        connection.query("INSERT INTO users (UserName, Password, Height, StartingWeight, TargetWeight) VALUES (?,?,?,?,?);",
                         [name, hashedPw, height, startingWeight, targetWeight] , function (err, result, fields) {
                             if (err) throw err;
                             res.send();
                             console.log("new account was inserted: " + result);
                         });
        res.send();
    });

    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port);
    });
});
