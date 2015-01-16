module.exports = function(app, express, Nerd, User, passport) {

    var express        = require('express');
    var router = express.Router();
    var port = process.env.PORT || 8080;

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.use('/api', router);

    router.get('/', function (req, res) {
        res.json({message: 'hooray! Welcome to my domain'});
    });

    router.route('/nerds')

        .post(function (req, res) {
            var nerd = new Nerd();
            nerd.name = req.body.name;

            nerd.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Nerd created' });
            });
        })

        .get(function(req, res) {
            Nerd.find(function(err, nerds) {
                if (err) {
                    res.send(err);
                }

                res.json(nerds);
            });
        });

    router.route('/nerd/:nerd_id')

        .get(function(req, res) {
            Nerd.findById(req.params.nerd_id, function(err, nerd) {
                if (err) {
                    res.send(err);
                }

                res.json(nerd);
            });
        })

        .put(function(req, res) {
            Nerd.findById(req.params.nerd_id, function(err, nerd) {

                if (err) {
                    res.send(err);
                }

                nerd.name = req.body.name;

                nerd.save(function(err) {

                    if (err) {
                        res.send(err);
                    }

                    res.json({ message: 'Nerd updated!' });
                });
            });
        })

        .delete(function(req, res) {
            Nerd.remove({
                _id: req.params.nerd_id
            }, function (err, nerd) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Successfully delete'});
            });
        });

    router.route('/users')

        .post(function (req, res) {
            var user = new User();
            user.email = req.body.email;
            user.password = user.generateHash(req.body.password);

            user.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Nerd created' });
            });
        })

        .get(function(req, res) {
            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                }

                res.json(users);
            });
        });

    router.route('/login')

        .post(function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {
                if (err) {
                    return res.json({ error: false });
                }
                if (!user) {
                    return res.json({ authentication_success: false });
                }
                console.log(user);
                console.log(req.logIn);
                req.login(user, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({ authentication_success: true });
                });
            })(req, res, next);
        });

    router.route('/isAuthenticated')

        .get(function(req, res) {
            res.json({ auth: req.isAuthenticated() });
        })
};