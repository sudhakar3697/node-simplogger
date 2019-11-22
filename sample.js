const { Logger } = require('./index');

const logger = new Logger();

/*
const logger = new Logger({
    console: 'file',
    file: './test.log',
    append: true,
    label: 'Test:',
    levels: ['ERROR', 'WARN']
});
*/

/*
const logger = new Logger(
    {
        console: 'both',
        file: './test.log',
        append: false,
        label: 'Test:',
        timestamp: 'iso',
        levels: ['ERROR', 'WARN', 'INFO', 'DEBUG']
    }
);
*/

logger.error('File not found', 'Sample.txt');
logger.warn('You are using older version of the API');
logger.success('User has been verified successfully');
logger.info('Server is running on port 8000');
logger.debug('I am here :P');
