const isLogDebugEnabled = () => false;
const isLogWarnEnabled = () => true;
const isLogInfoEnabled = () => true;
const isLogErrorEnabled = () => true;

const logReplacer = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      return null;
    }
  }
  return value;
};

const noLog = () => {
  // by-pass
  return;
};

const log = (level, message, params) => {
  const logMessage = {};

  logMessage.level = level;
  logMessage.message = message;
  logMessage.params = params;

  try {
    const messageObject = JSON.stringify(logMessage, logReplacer, 2);
    console.log(messageObject);
  } catch (err) {
    log('ERROR', 'Failure stringifing log message', { error: err });
  }
};

module.exports.debug = (msg, params) => isLogDebugEnabled() === true ? log('DEBUG', msg, params) : noLog();
module.exports.info = (msg, params) => log('INFO', msg, params);
module.exports.warn = (msg, params) => log('WARN', msg, params);
module.exports.error = (msg, params) => log('ERROR', msg, params);
