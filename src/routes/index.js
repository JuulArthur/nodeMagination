/**
 * Created by Juul on 05/09/14.
 */
module.exports = function (app, express, Nerd, User,  passport) {
    require('./api/index')(app, express, Nerd, User, passport);
    require('./frontend/index')(app, express, Nerd, User, passport);

    // frontend routes =========================================================
    // route to handle all angular requests

};