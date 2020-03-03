var mysql = require('mysql');
const express = require('express');
const app = express();

var connection = mysql.createConnection({
    host: "localhost",
    user: "expressmysql",
    password: "UomaWoo4",
    database: "painonhallinta_db"
});

//public folder as root
app.use(express.static('wwwroot'));
app.use(express.json());

connection.connect(function(err) {
    if (err) throw err;
    app.get('/', function (req, res) {
        res.sendFile('index.html');
    });

    //MEASUREMENTS
    app.get('/measures/:userId', function (req, res) { //Hae käyttäjän 1 mittaukset
        var userId = req.params.userId;
        console.log(userId);
        connection.query("SELECT * FROM measures WHERE UserId = ?", [userId], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    //https://stackoverflow.com/questions/37763764/set-id-in-put-method-nodejs
    app.post('/measures/:userId', function (req, res) { //Lisää uusi mittaus käyttäjälle 1
        var userId = req.params.userId;
        var d = new Date();
        var todayDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() //DATE '2020-02-27'
        console.log("Päivä" + todayDate);
        var weightToday = req.body.weightToday;
        console.log("wei" + weightToday);
        var userId = req.params.userId;
        connection.query("INSERT INTO measures (MeasureDate,Weight,UserId) VALUES (DATE ?,?,?);",
            [todayDate, weightToday, userId] , function (err, result, fields) {
            if (err) throw err;
            res.send();
            console.log("Measurement was inserted: " + result);
        });
    });

    //ACCOUNT
    app.get('/myaccount/:userId', function (req, res) { //Hae käyttäjän 1 mittaukset
        var userId = req.params.userId;
        connection.query("SELECT * FROM users WHERE Id = ?", [userId], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

    app.put('/myaccount/:userId', function (req, res) { //Muokkaa käyttäjän 1 tietoja
        var userId = req.params.userId;
        var name = req.body.name;
        var height = req.body.height;
        var startingWeight = req.body.startingWeight;
        var targetWeight = req.body.targetWeight;
        connection.query(
            "UPDATE users SET UserName = ?, Height = ?, StartingWeight = ?, TargetWeight = ? WHERE Id = ?",
            [name, height, startingWeight, targetWeight, userId] ,
            function (err, result, fields) {
                if (err) throw err;
                res.send();
                console.log("myaccount was updated: " + result);
            });

    });

    app.post('/users', function (req, res) { //Lisää uusi mittaus käyttäjälle 1
        var name = req.body.name;
        console.log("NAme" + name);
        var height = req.body.height;
        var startingWeight = req.body.startingWeight;
        var targetWeight = req.body.targetWeight;

        connection.query("INSERT INTO users (UserName, Height, StartingWeight, TargetWeight) VALUES (?,?,?,?);",
            [name.toString(), height, startingWeight, targetWeight] , function (err, result, fields) {
                if (err) throw err;
                res.send();
                console.log("new account was inserted: " + result);
            });
    });

    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port);
    });
});