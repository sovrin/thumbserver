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
const wrap = (route, handler, next) => {
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
 *
 * @return {*}
 * @param next
 */
const register = (next) => (mods) => {
    for (const mod of mods) {
        if (Array.isArray(mod)) {
            return register(next)(mod);
        }

        let route = null;

        const handle = mod((match) => {
            route = match;
        });

        wrap(route, handle, next);
    }
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = {
    register,
    route,
};
