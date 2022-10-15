module.exports = function() {
    return require(`./environments/${process.env.OAUTH_JWT_SERVER_ENV}-env.js`)
}
