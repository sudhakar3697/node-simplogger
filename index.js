const fs = require('fs');
const path = require('path');

class Logger {

    static COLORS = {
        ERROR: '\x1b[31m%s', // Red
        WARN: '\x1b[33m%s', // Yellow
        SUCCESS: '\x1b[32m%s', // Green
        INFO: '\x1b[37m%s', // White
        DEBUG: '\x1b[36m%s', // Cyan
        CLEAR: '\x1b[0m' // Clear
    };

    constructor(config = { levels: ['ERROR', 'WARN', 'SUCCESS', 'INFO', 'DEBUG'] }) {
        this.label = config.label || '';

        this.timestampStr = function () {
            switch (config.timestamp) {
                case 'iso':
                    return (new Date()).toISOString();
                case 'locale':
                    return (new Date()).toLocaleString();
                default:
                    return Logger.toCLFDateTimeString();
            }
        };

        if (config.console === 'file' || config.console === 'both') {
            try {
                fs.accessSync(path.dirname(config.file), fs.constants.F_OK | fs.constants.W_OK);
                const mode = config.append ? 'a' : 'w';
                const logFile = fs.createWriteStream(config.file, { flags: mode });
                if (config.console === 'both') { // file & console
                    this.log = function (level, ...msg) {
                        if (config.levels.includes(level)) {
                            logFile.write([level, ...msg].join(' ') + '\n');
                            console.log(Logger.COLORS[level], ...msg, Logger.COLORS['CLEAR']);
                        }
                    };
                }
                else { // file only
                    this.log = function (level, ...msg) {
                        if (config.levels.includes(level)) {
                            logFile.write([level, ...msg].join(' ') + '\n');
                        }
                    };
                }
            }
            catch (err) {
                console.log('Log directory is not writable: ', err);
                throw 'Log directory is not writable';
            }
        }
        else { // console only
            this.log = function (level, ...msg) {
                if (config.levels.includes(level)) {
                    console.log(Logger.COLORS[level], ...msg, Logger.COLORS['CLEAR']);
                }
            };
        }
    }

    error(...msg) {
        this.log('ERROR', this.timestampStr(), this.label, ...msg);
    }

    warn(...msg) {
        this.log('WARN', this.timestampStr(), this.label, ...msg);
    }

    success(...msg) {
        this.log('SUCCESS', this.timestampStr(), this.label, ...msg);
    }

    info(...msg) {
        this.log('INFO', this.timestampStr(), this.label, ...msg);
    }

    debug(...msg) {
        this.log('DEBUG', this.timestampStr(), this.label, ...msg);
    }

    static toCLFDateTimeString(dateTime = new Date()) {
        const pad2 = function (n) {
            const str = n.toString();
            return (str.length === 1 ? '0' : '') + str;
        };
        const MONTH3 = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const date = dateTime.getUTCDate();
        const hour = dateTime.getUTCHours();
        const mins = dateTime.getUTCMinutes();
        const secs = dateTime.getUTCSeconds();
        const year = dateTime.getUTCFullYear();
        const month = MONTH3[dateTime.getUTCMonth()];

        return (pad2(date) + '/' + month + '/' + year +
            ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs) +
            ' +0000');
    }

}

module.exports = {
    Logger
};