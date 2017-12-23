const
    logger = require(global.webconfig.logging.logger),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    {
        unauthorized
    } = require(global.webconfig.path.middlewares);

router.get('/:id', (req, res) => {
    try {
        console.log(req.params.id)
        const
            santa = Buffer.from(req.params.id, 'base64').toString(),
            jsonDB = require('node-json-db'),
            participantsDB = new jsonDB(`${global.webconfig.path.models}/defaultParticipants`, true, false),
            participants = participantsDB.getData('/');

        if (participants.indexOf(santa) > -1) {
            const { getMatch } = require(path.join(global.webconfig.path.lib, 'shuffler'));
            getMatch(santa, (err, match) => {
                if (err) {
                    logger.error(err);
                    return unauthorized(res);
                }
                logger.info(`${santa} is secret santa of ${match}`);
                return res.render('index.html', {
                    name: match
                });
            });
        } else {
            return unauthorized(res);
        }
    } catch (error) {
        return unauthorized(res);
    }
});

//export this router to use in our index.js
module.exports = router;