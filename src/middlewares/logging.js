/**
 *
 * @param handle
 * @return {function(...[*]): *}
 */
const logging = (handle) => (...args) => {
    // execute route handle
    const data = handle(...args);

    console.info(data);
    return data;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = logging;
