const { format } = require('date-fns');
const {v4: uuid} = require('uuid');

const fsPromises = require('fs').promises;
const path = require('path');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

const logEvents = async (message) => {
    const dateTime = `$(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))`;
    const logItem = `$({dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err)
    }
}
console.log('hello')

console.log(uuid())