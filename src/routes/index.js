const {route, register} = require('../router');
const {modules} = require('../utils');

// process the response of the route
const next = (response) => {
    return console.info(response);
};

register(next)(
    modules('./src/routes'),
);

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = route;
