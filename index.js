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

connection.connect(function(err) {
    if (err) throw err;
    app.get('/', function (req, res) {
        res.sendFile('index.html');
    });

    app.get('/measures', function (req, res) {
        connection.query("SELECT * FROM measures", function (err, result, fields) {
            if (err) throw err;
            qResult = result;
            res.send(result);
        });
    });

    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Example app listening at http://%s:%s", host, port);
    });
});