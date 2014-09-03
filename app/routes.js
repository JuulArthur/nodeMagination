module.exports = function(app) {

    var express        = require('express');
    var router = express.Router();
    var port = process.env.PORT || 8080;
    var Nerd = require('./models/Nerd');

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

    router.route('/nerds/:nerd_id')

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

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
    app.get('/pages/*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};