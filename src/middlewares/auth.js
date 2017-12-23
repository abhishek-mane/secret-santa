const logger = require(global.webconfig.logging.logger)

module.exports = (req, res, next) => {
    logger.enter('middleware', __filename);
    logger.data('req.session.passport.user', JSON.stringify(req.session.passport));

    if (req.isAuthenticated()) {
        logger.exit('middleware', __filename);
        return next();
    }

    require('./401')(res);
    logger.exit('auth', __filename);
    return null;
}