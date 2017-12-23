// Make web configurations globally accessible
global.webconfig = require('./web.config')

// Initialize required variables
let
    // importing express
    express = require('express'),
    // Initialize express app
    app = express(),
    // get server configuration modules
    {
        logDirCheck,
        initBodyParser,
        initCookieParser,
        initServeStatic,
        initViewEngine,
        initMorgan,
        initPageNotFound,
        initRoutes,
        initServer
    } = require(global.webconfig.path.server_config);

logDirCheck().
    then(() => {
        return initBodyParser(app);
    }).
    then(() => {
        return initCookieParser(app);
    }).
    then(() => {
        return initServeStatic(express, app);
    }).
    then(() => {
        return initViewEngine(app);
    }).
    then(() => {
        return initMorgan(app);
    }).
    then(() => {
        return initRoutes(app);
    }).
    then(() => {
        return initPageNotFound(app);
    }).
    then(() => {
        return initServer(app);
    }).
    catch((error) => {
        const logger = require(global.webconfig.logging.logger);
        logger.error(error);
        return error;
    });