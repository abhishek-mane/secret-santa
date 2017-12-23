const
    morgan = require('morgan'),
    rfs = require('rotating-file-stream'),
    logDirectory = global.webconfig.logging.log_dir,
    accessLogStream = rfs(global.webconfig.logging.access_log_file, {
        interval: '1d', // rotate daily
        path: logDirectory
    }),
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize morgan');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use(morgan('combined', { stream: accessLogStream }));

        logger.exit('-', __filename);

        return resolve();
    });
}