module.exports = {
    internalServerError: require('./500'),
    unauthorized: require('./401'),
    isAuthenticated: require('./auth')
}