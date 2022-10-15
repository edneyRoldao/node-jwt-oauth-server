const express = require('express')
const appEnv = require('./env-config')()
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const configServer = () => {
    const app = express()

    app.set('view engine', 'ejs')

    app.use(bodyParser.json())
    app.use(express.static('./static'))
    app.use(bodyParser.urlencoded({extended: false}))

    if (appEnv.enableApiRateLimit) {
        const limiter = rateLimit({
            windowMs: appEnv.apiRateLimitWindowInMinutes * 60 * 1000,
            max: appEnv.apiRateLimitAmount,
            message: appEnv.apiRateLimitMessage,
            standardHeaders: true,
            legacyHeaders: false
        })

        app.use(limiter)
    }

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header("Access-Control-Allow-Headers", '*')
        next()
    })

    return app
}

module.exports = {
    configServer
}
