const path = require('path');

module.exports = (name, callback) => {
    const
        jsonDB = require('node-json-db'),
        participantsDB = new jsonDB(`${global.webconfig.path.models}/participants`, true, false),
        mapperDB = new jsonDB(`${global.webconfig.path.models}/mapper`, true, false),
        participants = participantsDB.getData('/');

    if (mapperDB.getData(`/${name}`)) {
        return callback(null, mapperDB.getData(`/${name}`));
    }

    let match = "";
    while (true) {
        match = participants[Math.floor(Math.random() * participants.length)];
        if (match !== name) {
            mapperDB.push(`/${name}`, match);
            participants.splice(participants.indexOf(match), 1)
            participantsDB.push('/', participants);
            break;
        }
    }

    return callback(null, match);
}