var mysql = require('mysql');
const express = require('express');
const app = express();

//public folder as root
app.use(express.static('wwwroot'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});