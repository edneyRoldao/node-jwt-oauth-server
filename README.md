# node-jwt-oauth-server
Short history: do you already stop to think we need an OAuth system to manage users' authentication and authorization every time a new project comes up? I know there are many third-party solutions that can be used, but all of them are expensive and hard to configure and adapt to your business. A built a simple API and Webapp to create and manage users using JWT to generate access tokens and more.

- This is an OAuth server that should be used to avoid some boillerplate and boring code stuff
- Here we have and API and a Web app to manage users and authentication processes
- If you do not want to waste your time coding a boring login screen and other related, this is for you.


## API Features and Web application
- User authentication using JWT
- Generate JWT
- Get user Payload from JWT
- Create User
- List users (admin only)
- get user by id or username (admin only)
- create and update user's profile with any field want for your business
- Email notification to send password updates and account activation
- purge unused data processes to save money and performance
- API and webapp rate limiter access to avoid hacking
- i18n simple implementation


## Main Tecnologies:
- Node as programming language
- MongoDB and Mongoose as database
- express as application server
- EJS engine to render HTML pages
- nodemailer to send notifications via email


## How to user
Feel free to copy this code and used for your own needs. You just need to set the environments bellow to start testing.


## Environment variables required to user this project
- OAUTH_JWT_SERVER_ENV    (must be: development or production)
- SERVER_PORT
- MONGO_HOST
- MONGO_PASSWORD
- MONGO_USERNAME
- MONGO_DATABASE
- MAIL_SENDER             (this is the email that should be user to send notifications to users)
- MAIL_SENDER_PORT     
- MAIL_SENDER_HOST
- MAIL_SENDER_PASSWORD
- MAIL_USERNAME           (Here the email sender's name)
- ADMIN_ACCESS_TOKEN      (this is an arbitrary token you should generate to give access for admin endpoints)
- TOKEN_SECRET            (this key your should generate to sign tokens)


## Properties that could be customized (./configs/environments)
- env: 'development',
- port: process.env.SERVER_PORT,
- purgeMongoDataCron: '0 0 * * *',
- dataToBePurgedAfterMinutes: 24 * 60,        
- updatePasswordCodeExpirationMinutes: 10,
- enableApiRateLimit: true,
- apiRateLimitWindowInMinutes: 1,
- apiRateLimitAmount: 50,
- apiRateLimitMessage: 'To many requests from this IP, please try again later',
- host: should the application host,
- language: 'en',                         // options (en, pt-br) for i18n
- mailSender: process.env.MAIL_SENDER,
- mailSenderPort: process.env.MAIL_SENDER_PORT,
- mailSenderSecure: false,
- mailSenderHost: process.env.MAIL_SENDER_HOST,
- mailSubjectPrefix: 'Your business name',
- mailSenderUsername: process.env.MAIL_USERNAME,
- mailSenderPassword: process.env.MAIL_SENDER_PASSWORD,
- redirectNotFoundRoute: '',
- redirectUrlAfterLogin: 'your real application host, we redirect and set bearer token on the request header',
- activateCodeExpirationMinutes: 2,
- validateUserPasswordFormatRegex: /(.){3,}/i, // at least 3 characters
- adminAccessToken: process.env.ADMIN_ACCESS_TOKEN,
- expirationTokenInMinutes: 5,
- userHashPasswordSaltOrRound: 10,
- accessTokenSecret: process.env.TOKEN_SECRET,    
- mongoConnection: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`


## Run app development env
```
npm run start-dev
```


## Run app development prod
```
npm start
```


## References
- [the dev web simplefied youtube channel - about jwt](https://www.youtube.com/watch?v=mbsmsi7l3r4&t=875s&ab_channel=WebDevSimplified)
- [the dev web simplefied youtube channel - about bcrypt](https://www.youtube.com/watch?v=-RCnNyD0L-s&t=329s&ab_channel=WebDevSimplified)
- [Mongoose documentation](https://mongoosejs.com/docs/api.html#)
- [API Rate limiter](https://www.npmjs.com/package/express-rate-limit)
- [How to connect mongo atlas to robo3t](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/)
- [responsive login page - v1](https://github.com/hosseinnabi-ir/Responsive-Login-Form-using-Bootstrap-5)
- [responsive login page - v2](https://www.youtube.com/watch?v=mSAEGEAnyIY&ab_channel=OnlineTutorials)
- [javascript form validation](https://www.youtube.com/watch?v=In0nB0ABaUk&ab_channel=WebDevSimplified)
- [loading javascript button](https://www.youtube.com/watch?v=CssyhqEizuI&ab_channel=CodewithAniaKub%C3%B3w)


## Gerenate an arbitrary token secret
```
node
require('crypto').randomBytes(64).toString('hex')
```
