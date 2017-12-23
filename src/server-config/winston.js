const
    path = require('path'),
    winston = require('winston'),
    log_file_name = path.join(
        global.webconfig.logging.log_dir,
        global.webconfig.logging.server_log_file
    ),
    max_log_files = global.webconfig.logging.maxFiles,
    max_log_file_size = global.webconfig.logging.maxLogFileSize,
    str_format = require('string-format'),
    str_format_options = {
        align: 'right'
    },
    fixedWidthString = require('fixed-width-string'),
    timestamp = (() => {
        return `[ ${(new Date()).toLocaleString()} ]`
    });

class Logger {
    constructor(logger) {
        this.logger = logger;
        this.fixWidth = 7;
    }

    log(level, msg) {
        this.logger.log(level, msg)
    }
    enter(func, file) {
        this.logger.verbose(str_format('[ {0} ] : {1} | {2}',
            fixedWidthString('entry', this.fixWidth, str_format_options), func, file
        ));
    }

    exit(func, file) {
        this.logger.verbose(str_format('[ {0} ] : {1} | {2}',
            fixedWidthString('exit', this.fixWidth, str_format_options), func, file
        ));
    }

    task(msg) {
        this.logger.info(str_format('[ {0} ] : {1}',
            fixedWidthString('running', this.fixWidth, str_format_options),
            msg
        ));
    }

    info(msg) {
        this.logger.info(str_format('[ {0} ] : {1}',
            fixedWidthString('info', this.fixWidth, str_format_options),
            msg
        ));
    }

    warn(msg) {
        this.logger.warn(str_format('[ {0} ] : {1}',
            fixedWidthString('info', this.fixWidth, str_format_options),
            msg
        ));
    }

    data(id, value) {
        this.logger.debug(str_format('[ {0} ] : {1}',
            fixedWidthString('data', this.fixWidth, str_format_options),
            str_format('{0} = ({1}) {2}',
                id,
                (value ? typeof (value) : ''),
                value
            )
        ));
    }

    error(msg) {
        if (msg instanceof Error) {
            msg = `${msg.message}\n${msg.stack}`;
        }
        this.logger.error(str_format('[ {0} ] : {1}',
            fixedWidthString('failed', this.fixWidth, str_format_options),
            msg
        ));
    }

    done(msg) {
        this.logger.info(str_format('[ {0} ] : {1}',
            fixedWidthString('done', this.fixWidth, str_format_options),
            msg
        ));
    }
}

module.exports = new Logger(
    new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: global.webconfig.logging.console_log_level,
                prettyPrint: true,
                colorize: true,
                silent: false,
                timestamp: timestamp,
                formatter: (options) => {
                    return str_format('{0} : {1} => {2}',
                        options.timestamp(),
                        fixedWidthString(winston.config.colorize(options.level, options.level.toUpperCase()), 8),
                        (options.message ? options.message : '')
                    );
                }
            }),
            new (winston.transports.File)({
                level: global.webconfig.logging.file_log_level,
                prettyPrint: true,
                silent: false,
                filename: log_file_name,
                maxFiles: max_log_files,
                zippedArchive: false,
                maxsize: max_log_file_size,
                json: false,
                timestamp: timestamp,
                formatter: (options) => {
                    return str_format('{0} : {1} => {2}',
                        options.timestamp(),
                        fixedWidthString(options.level.toUpperCase(), 8),
                        (options.message ? options.message : '')
                    );
                }
            })
        ]
    })
);