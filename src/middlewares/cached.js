const {readFileSync, mkdirSync} = require('fs');
const {destination} = require('../../config');
const {mark, measure} = require('../performance');

/**
 *
 * @param next
 * @return {Function}
 */
const factory = (next) => (match, res, end) => {
    const {input} = match;
    const [path] = match;

    let file;

    try {
        file = readFileSync(destination + input);
    } catch (e) {
        // try {
        //     mkdirSync(destination + path);
        // } catch (e) {
        //     //
        // }

        return next(match, res, end);
    }

    mark('finish');
    measure('serve cached', 'start', 'finish');
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(file);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = factory;
