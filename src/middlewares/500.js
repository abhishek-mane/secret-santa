module.exports = (response) => {
    response.status(500).json({
        code: 500,
        message: 'Internal server error.'
    });
}