/**
 *
 * @param s
 * @param obj
 * @return {*[]}
 */
const render = (s, obj = {}) => {
    const map = (key) => [key, new RegExp('{' + key + '}', 'g')];
    const reduce = (acc, [key, regex]) => acc.replace(regex, obj[key]);

    return Object
        .keys(obj)
        .map(map)
        .reduce(reduce, s)
    ;
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = {
    render
};
