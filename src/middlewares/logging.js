/**
 *
 * @param next
 * @return {function(...[*]): *}
 */
const logging = (next) => (...args) => {
    // execute route next
    const data = next(...args);

    console.info(data);
    return data;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = logging;
