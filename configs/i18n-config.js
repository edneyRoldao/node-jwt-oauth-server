const appEnv = require('./env-config')()

module.exports = function() {
    return require(`./messages/${appEnv.language}-messages.js`)
}
