module.exports = function() {
    return require(`./environments/${process.env.NODE_ENV}-env.js`)
}
