/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (match) => {
    match(/^\/thumb(\d+)x(\d+)/);

    return (param, next, send) => {
        send(param);
        next('final');
    };
};
