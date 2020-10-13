const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser')
const path = require('path');
const robots = require('express-robots-txt');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const authmiddleware = require('./middlewares/admin/authmiddleware')
const domain = require('./config/domain')
const helmet = require('helmet')

app.use(helmet())
app.use(cookieParser())

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    if (req.headers["x-forwarded-proto"] == "http") {
        res.redirect(domain + req.url);
    } else {
        return next();
    }
});


app.use(function (req, res, next) {
    //res.setHeader("Cache-Control", "max-age=31556926");
    res.setHeader("Cache-Control", 'no-cache, no-store, must-revalidate');
    return next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.set('tmpDir', path.join(__dirname, 'tmp'));
app.use(robots(__dirname + '/robots.txt'));
// if (app.get('env') === 'development') {
//     console.log(app.get('env'))
//     app.use(express.errorHandler());
// }
app.disable('x-powered-by');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(express.static('static', {
    maxage: false,
    etag: false
}))

const authRoutes = require('./auth-routes');
const webRoutes = require('./web-routes');
const apiRoutes = require('./api-routes');

app.use('/api', authRoutes);
app.use('/api', authmiddleware, apiRoutes);
app.use('/', webRoutes);


app.listen(3000, () => {
    console.log('Start app')
});