/**
 * Created by Juul on 05/09/14.
 */
module.exports = function (app, express, Nerd, User,  passport) {
    require('./api')(app, express, Nerd, User, passport);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/pages/*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};