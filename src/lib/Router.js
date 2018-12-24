const {middleware} = require('../utils');
const {mark} = require('../performance');

const GROUPS_REGEX = /\((?!\?)/gi;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 24.12.2018
 * Time: 07:37
 */
class Router {

    /**
     *
     * @param fallback
     * @param routes
     */
    constructor(fallback, routes = []) {
        this._fallback = fallback;
        this._routes = routes;
        this._middlewares = [];
    }

    /**
     *
     * @param req
     * @param res
     * @return {*}
     */
    route(req, res) {
        const {_routes: routes, _fallback: fallback} = this;
        mark('start');

        for (const {method, exp, handler} of routes) {
            if (method === 'ANY' || method === req.method) {
                const match = req.url.match(exp);

                if (match) {
                    const filtered = match.filter(Boolean).slice(1);
                    const groups = exp.source.match(GROUPS_REGEX);

                    if (groups) {
                        if (groups.length === filtered.length) {
                            return handler(req, res, match);
                        } else {
                            continue;
                        }
                    }

                    return handler(req, res, match);
                }
            }
        }

        return fallback(req, res);
    }

    /**
     *
     * @param method
     * @param exp
     * @param handler
     * @return {Router}
     */
    on(method, exp, handler) {
        this._routes.push({method: method.toUpperCase(), exp, handler});
        return this;
    }

    /**
     *
     * @return {*}
     * @param end
     */
    register(end) {
        return (mods) => {
            for (const mod of mods) {
                if (Array.isArray(mod)) {
                    return this.register(end)(mod);
                }

                let route = null;

                let handle = mod((match) => {
                    route = match;
                });

                handle = middleware(handle, this._middlewares);

                this.on(METHOD.GET, route, (req, res, param) => (
                    handle(param, res, end(res))
                ));
            }
        };
    };

    /**
     *
     * @param middleware
     * @return {Router}
     */
    use(middleware) {
        this._middlewares.unshift(middleware);
        return this;
    }
}

const METHOD = {
    ANY: 'any',
    DELETE: 'delete',
    GET: 'get',
    HEAD: 'head',
    OPTIONS: 'options',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put',
};

Router.METHOD = METHOD;

module.exports = Router;
