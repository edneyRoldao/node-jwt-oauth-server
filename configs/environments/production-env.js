
module.exports = {
    // app
    env: 'production',
    port: process.env.PORT,
    purgeMongoDataCron: '0 0 * * *',
    dataToBePurgedAfterMinutes: 24 * 60,
    updatePasswordCodeExpirationMinutes: 10,
    enableApiRateLimit: true,
    apiRateLimitWindowInMinutes: 1,
    apiRateLimitAmount: 50,
    apiRateLimitMessage: 'To many requests from this IP, please try again later',
    host: 'https://ednsolutions-oauth-server.herokuapp.com',
    language: 'en', // options (en, pt-br)
    
    // mail
    mailSender: process.env.MAIL_SENDER,
    mailSenderPort: process.env.MAIL_SENDER_PORT,
    mailSenderSecure: false,
    mailSenderHost: process.env.MAIL_SENDER_HOST,
    mailSubjectPrefix: 'Brazil Invest Spotlight',
    mailSenderUsername: process.env.MAIL_USERNAME,
    mailSenderPassword: process.env.MAIL_SENDER_PASSWORD,

    // WEB_APP
    redirectNotFoundRoute: '',
    redirectUrlAfterLogin: 'https://ednsolutions-oauth-server.herokuapp.com/health', // use this to redirect user to your application after login (token generation)

    // user
    activateCodeExpirationMinutes: 2,
    validateUserPasswordFormatRegex: /(.){3,}/i, // at least 3 characters


    // auth
    adminAccessToken: process.env.ADMIN_ACCESS_TOKEN,
    expirationTokenInMinutes: 5,
    userHashPasswordSaltOrRound: 10,
    accessTokenSecret: process.env.TOKEN_SECRET,    
    mongoConnection: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
}
