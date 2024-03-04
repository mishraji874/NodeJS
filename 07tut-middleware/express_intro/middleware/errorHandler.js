const { logEvents } = require('./logEvents');

const errorHandler = (req, res, eerr, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
}


module.exports = errorHandler;