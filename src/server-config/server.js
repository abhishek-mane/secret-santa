const
    colors = require('colors'),
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize the server');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        const PORT = process.env.PORT || global.webconfig.port;
        logger.data('PORT', PORT)
        
        const server = app.listen(PORT, () => {
            logger.info(`Remote Monitoring Application is listening at http://localhost:${server.address().port}`.bgWhite.black);
        });

        logger.exit('-', __filename);

        return resolve();
    });
};