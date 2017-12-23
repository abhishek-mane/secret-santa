const logger = require(global.webconfig.logging.logger);

module.exports = (express, app) => {

    logger.task('Initialize static web contents');

    return new Promise((resolve) => {
        logger.enter('-', __filename);
        let
            prefix = global.webconfig.static_prefix,
            public_dir = global.webconfig.path.public;

        logger.data('prefix', prefix);
        logger.data('public_dir', public_dir);

        app.use(prefix, express.static(public_dir));
        logger.exit('-', __filename);

        return resolve();
    });
};