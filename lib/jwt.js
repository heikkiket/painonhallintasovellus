const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwtHelper;

function jwtHelper() {
    const secret = config.secret;
    return expressJwt({secret}).unless({
        path: [
            /\/view.*/,
            '/login',
            '/'
        ]
    });
}
