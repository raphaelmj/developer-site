const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

var authmiddleware = function (req, res, next) {

    let cookies = req.cookies;

    if (cookies.authToken) {
        let auth = jwt.verify(cookies.authToken, secret)
        if (!auth) {
            // return res.sendStatus(401);
            next();
        } else {
            next();
        }

    } else {
        next();
        // return res.sendStatus(401);
    }

}

module.exports = authmiddleware;