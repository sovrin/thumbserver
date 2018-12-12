const {send} = require('micro');
const {default: Router} = require('regex-router');

const router = new Router((req, res) => {
    send(res, 404);
});

/**
 *
 * @param route
 * @param handler
 * @param next
 */
const register = (route, handler, next) => {
    router.get(route, (req, res, param) => (
        handler(param, next, (obj) => send(res, 200, obj))
    ));
};

/**
 *
 * @param req
 * @param res
 */
const route = (req, res) => router.route(req, res);

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = {
    register,
    route,
};
