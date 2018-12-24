const {executor} = require('../utils');

/**
 *
 * @param args
 * @param options
 * @return {*}
 */
const convert = (args, options = {}) => executor('convert', args, options);

module.exports = {convert};
