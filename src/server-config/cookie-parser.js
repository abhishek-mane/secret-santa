const
    cookieParser = require('cookie-parser'),
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize cookie-parser');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use(cookieParser());

        logger.exit('-', __filename);
        return resolve();
    });
}