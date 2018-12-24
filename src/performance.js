const {performance, PerformanceObserver} = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach(({name, duration}) => {
        console.log(`${name}:${duration}ms`);
    });
});

obs.observe({entryTypes: ['measure']});

/**
 *
 * @param marker
 */
const mark = (marker) => {
    performance.mark(marker);
};

/**
 *
 * @param name
 * @param start
 * @param stop
 */
const measure = (name, start, stop) => {
    performance.measure(name, start, stop);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 24.12.2018
 * Time: 10:19
 */
module.exports = {
    mark, measure,
};
