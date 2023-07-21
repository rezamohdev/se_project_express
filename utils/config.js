const { ERROR_400, ERROR_404, ERROR_500 } = require('./errors');

module.exports.handleError = (req, res, error) => {
    console.error(`error is : ${error}`)
    if (error.name === 'ValidationError') {
        res.status(ERROR_400).send({
            message: 'Passed invalid data !'
        });
    } else if (error.name === 'CastError') {
        res.status(ERROR_400).send({
            message: 'The request is sent to a none existense resource!'
        });
    } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_404).send({
            message: 'Passed invalid data !'
        });
    } else {

        res.status(ERROR_500).send({
            message: 'An error has occurred on the server.'
        });
    }
}

