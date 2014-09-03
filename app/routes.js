module.exports = function(app) {

    var router = express.Router();
    var port = process.env.PORT || 8080;

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
    app.use('/api', router);

    router.get('/', function (req, res) {
        res.json({message: 'hooray! Welcome to my domain'});
    });

    router.route('/bears')

        .post(function (req, res) {
            var bear = new Bear();
            bear.name = req.body.name;

            bear.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Bear created' });
            });
        })

        .get(function(req, res) {
            Bear.find(function(err, bears) {
                if (err) {
                    res.send(err);
                }

                res.json(bears);
            });
        });

    router.route('/bears/:bear_id')

        .get(function(req, res) {
            Bear.findById(req.params.bear_id, function(err, bear) {
                if (err) {
                    res.send(err);
                }

                res.json(bear);
            });
        })

        .put(function(req, res) {
            Bear.findById(req.params.bear_id, function(err, bear) {

                if (err) {
                    res.send(err);
                }

                bear.name = req.body.name;

                bear.save(function(err) {

                    if (err) {
                        res.send(err);
                    }

                    res.json({ message: 'Bear updated!' });
                });
            });
        })

        .delete(function(req, res) {
            Bear.remove({
                _id: req.params.bear_id
            }, function (err, bear) {
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