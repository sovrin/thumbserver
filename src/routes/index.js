const {register, route} = require('../router');

const routes = [
    [/^\/thumb(\d+)$/, require('./thumb/w')],
    [/^\/thumb(\d+)x(\d+)$/, require('./thumb/wh')],
    [/^\/([sn])?([ew])?thumb(\d+)x(\d+)$/, require('./thumb/bias')],
];

// process the response of the route
const next = (response) => {
    return console.info(response);
};

while (routes.length) {
    const [route, handle] = routes.shift();
    register(route, handle, next);
}

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = route;
