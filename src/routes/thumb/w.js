/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 12.12.2018
 * Time: 00:54
 */
module.exports = (param, next, send) => {
    send(param);
    next('final');
};
