const {readdirSync} = require('fs');
const {resolve} = require('path');
const {spawn} = require('child_process');

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
 *
 * @param path
 * @return {Array}
 */
const modules = (path) => {
    const filter = ((file) => file !== 'index.js');

    const map = (name) => {
        const file = resolve(path, name);

        if (!name.includes('.js') ) {
            return modules(file);
        }

        return require(file);
    };

    return readdirSync(path)
        .filter(filter)
        .map(map)
    ;
};

/**
 *
 * @param service
 * @param middleware
 * @return {*}
 */
const middleware = (service, middleware = []) => (
    middleware.reduce(
        (fn, nextMiddleware) => nextMiddleware(fn),
        service,
    )
);

/**
 *
 * @param executable
 * @param args
 * @param options
 */
const executor = (executable, args, options = {}) => (
    new Promise((resolve, reject) => {
        let stdout = '', stderr = '';
        const process = spawn(executable, args, options);

        process.stdout.on('data', chunk => {
            stdout += chunk;
        });

        process.stderr.on('data', chunk => {
            stderr += chunk;
        });

        process
            .on('error', error => reject(error))
            .on('close', code => resolve({
                code,
                error: stderr.trim(),
                output: stdout.trim()
            }))
        ;
    })
);

/**
 * User: Oleg Kamlowski <n@sovrin.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = {
    render, modules, middleware, executor
};
