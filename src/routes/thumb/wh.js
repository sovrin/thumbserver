const {convert} = require('../../lib/ImageMagick');
const {origin, destination} = require('../../../config');
const {mark, measure} = require('../../performance');

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (match) => {
    match(/\/thumb(\d+)x(\d+)\//);
    return (param, res, next) => {

        const {input} = param;
        const [path, width, height] = param;

        const source = origin + '\\' + input.substring(path.length);
        const cmd = ['-thumbnail', width + 'x' + height, source, destination + input];

        convert(cmd)
            .then((ret) => {
                mark('finish');
                measure('routing and compilation', 'start', 'finish');

                next(ret);
            });
    };
};
