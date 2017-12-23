const
    mustache = require('mustache-express'),
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize view-engine');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.engine('html', mustache());
        app.set('view engine', 'html');
        app.set('views', global.webconfig.path.views);

        logger.exit('-', __filename);

        return resolve();
    });
};