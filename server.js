const appEnv = require('./configs/env-config')()
const appMessages = require('./configs/i18n-config')()
const authRouter = require('./routes/auth-routes')
const usersRouter = require('./routes/users-routes')
const webappRouter = require('./routes/webapp-routes')
const mongoConfig = require('./configs/mongoose-config')
const expressConfig = require('./configs/express-config')
const purgeDataScheduler = require('./schedulers/purge-data-schedule')

purgeDataScheduler()
mongoConfig.connect()
const app = expressConfig.configServer()

// ROUTES
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/webapp', webappRouter)

// Unknown URL
app.get('*', (req, res) => {
    if (appEnv.redirectNotFoundRoute)
       return res.redirect((appEnv.redirectNotFoundRoute))

    res.render('not-found', {message: appMessages.pageNotFound})
})

// START SERVER
app.listen(appEnv.port, () => {
    console.log(`active environment: ${appEnv.env}`)
    console.log(`Language: ${appEnv.language}`)
    console.log(`OAuth server is ready on port: ${appEnv.port}`)
})
