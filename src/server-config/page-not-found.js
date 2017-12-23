const logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialise 404 response');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use((req, res) => {
            res.status(404);
            // respond with html page
            if (req.accepts('html')) {
                res.render('404.html', {
                    url: req.url
                });
                return;
            }
            // respond with json
            if (req.accepts('json')) {
                res.send({
                    error: '404 : Page Not found'
                });
                return;
            }
            // default to plain-text. send()
            res.type('txt').send('404 - Page Not found');
        });

        logger.exit('-', __filename);

        return resolve();
    });
};