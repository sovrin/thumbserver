const {send} = require('micro');
const {modules} = require('../utils');
const Router = require('../lib/Router');

const router = new Router((req, res) => {
    send(res, 404);
});

// process the response of the route
const end = (res) => (value) => {

    send(res, 200, value);
    return value;
};

router.use(require('../middlewares/cached'));

router.register(end)(
    modules('./src/routes'),
);

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (req, res) => router.route(req, res);
