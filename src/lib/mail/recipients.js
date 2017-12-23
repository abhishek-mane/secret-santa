const 
    jsonDB = require('node-json-db'),
    participantsDB = new jsonDB(`${global.webconfig.path.models}/mails`, true, false),
    participants = participantsDB.getData('/');


module.exports = participants;