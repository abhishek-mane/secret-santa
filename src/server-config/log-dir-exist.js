const path = require('path');

module.exports = () => {
    return new Promise((resolve, reject) => {
        const
            fs = require('fs'),
            dir = global.webconfig.logging.log_dir;

        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir);
            } catch (err) {
                console.log(`${dir} directory does not exists !`);
                return reject(err);
            }
        }

        const
            defaultMapper = path.join(global.webconfig.path.models, 'defaultMapper.json'),
            mapper = path.join(global.webconfig.path.models, 'mapper.json'),
            defaultParticipants = path.join(global.webconfig.path.models, 'defaultParticipants.json'),
            participants = path.join(global.webconfig.path.models, 'participants.json');

        fs.createReadStream(defaultMapper).pipe(fs.createWriteStream(mapper));
        fs.createReadStream(defaultParticipants).pipe(fs.createWriteStream(participants));

        return resolve();
    });
}