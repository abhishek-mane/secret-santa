module.exports = (response) => {
    response.status(401).json({
        code: 401,
        message: 'Unauthorised request.'
    });
}