module.exports = function(app) {

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/pages/*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};