var LocalStrategy = require('passport-local').Strategy;

exports = module.exports = function (passport, User) {

/*    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password'
    }, function(username, password, done) {
        User.findOne({ 'email' :  email }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, false, req.flash('signupMessage', 'This email is already in use.'));

            var newUser = new User();

            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            newUser.save(function (err) {
                if (err) {
                    return done(err);
                }
                done(null, newUser);
            });
        });
    }));*/

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password'
    }, function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if (err) {
                return done(err);
            }

            if(!user) {
                return done(null, null);
            }

            if (user.validPassword(password)) {
                return done(null, user);
            }

            done(null, null)
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function (user, done) {
        User.findOne({ 'email' :  user.email }, function (err, user) {
            if (err) return done(err);

            done(null, { id: user.id, email: user.email, password: user.password })
        });
    });

/*    passport.use(new FacebookStrategy({
        clientID: config.get('facebook.client.id'),
        clientSecret: config.get('facebook.client.secret'),
        callbackURL: config.get('facebook.callback.url'),
        passReqToCallback : true
    }, authentication.facebook.auth));

    passport.use(new GoogleStrategy({
        clientID: config.get('google.client.id'),
        clientSecret: config.get('google.client.secret'),
        callbackURL: config.get('google.callback.url'),
        passReqToCallback : true
    }, authentication.google.auth));

    passport.use(new InstagramStrategy({
        clientID: config.get('instagram.client.id'),
        clientSecret: config.get('instagram.client.secret'),
        callbackURL: config.get('instagram.callback.url'),
        passReqToCallback : true
    }, authentication.instagram.auth));*/
};