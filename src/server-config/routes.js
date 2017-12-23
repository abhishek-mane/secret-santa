const logger = require(global.webconfig.logging.logger);

module.exports = (app) => {
    logger.task('Initialize the routes');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        let controllers = require(global.webconfig.path.routes);

        for (let key in controllers) {
            app.use(key, controllers[key]);
        }

        logger.exit('-', __filename);

        return resolve();
    });
};