/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (match) => {
    match(/\/([sn])?([ew])?thumb(\d+)x(\d+)\//);

    return (param, next) => {
        return next(param);
    };
};
