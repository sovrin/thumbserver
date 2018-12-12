// micro.js
const {resolve} = require('path');

const service = (entry) => {
    const path = resolve(process.cwd(), entry);

    if (process.env.NODE_ENV === 'production') {
        const micro = require('micro');

        const handler = require(path);
        const server = micro(handler);
        server.listen(3000);
    } else {
        const micro = require('micro-dev/lib/serve');

        const flags = {
            silent: false,
            host: '::',
            port: 3000,
            limit: '1mb', _: {},
        };
        micro(path, flags);
    }
};

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = service;
