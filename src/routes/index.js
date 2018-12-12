const {route, register, use} = require('../router');
const {modules} = require('../utils');

// process the response of the route
const next = (response) => {
    console.info(response);

    return response;
};

use(require('../middlewares/logging'));
use(require('../middlewares/test'));

register(next)(
    modules('./src/routes'),
);

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = route;
