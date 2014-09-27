module.exports = function(app) {

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', (req, res) => {
        res.sendfile('/public/index.html');
    });

};