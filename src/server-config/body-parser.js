const
    bodyParser = require('body-parser'),
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize body-parser');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        logger.exit('-', __filename);
        return resolve();
    });
}