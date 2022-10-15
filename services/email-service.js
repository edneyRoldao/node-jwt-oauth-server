const mailer = require('nodemailer')
const appEnv = require('./../configs/env-config')()
const appMessages = require('./../configs/i18n-config')()


async function sendMailToUser(email, code, subject, message, type) {
    const transport = mailer.createTransport({
        host: appEnv.mailSenderHost,
        port: appEnv.mailSenderPort,
        secure: appEnv.mailSenderSecure,
        auth: {
            user: appEnv.mailSender,
            pass: appEnv.mailSenderPassword
        }
    })

    let content = {}

    if (type == 'activation') {
        content.message = appMessages.confirmEmailContent
        content.link = `${appEnv.host}/webapp/activate-user?username=${email}&code=${code}`
    }

    if (type == 'password') {
        content.message = appMessages.updatePasswordEmailContent
        content.link = `${appEnv.host}/webapp/user/new-password?username=${email}&code=${code}`
    }
        
    await transport.sendMail({
        from: `"${appEnv.mailSenderUsername}" <${appEnv.mailSender}>`,
        to: email,
        subject: `${appEnv.mailSubjectPrefix} - ${subject}`,
        html: `${message} <h3><strong><a href="${content.link}">${content.message}</a></strong></h3>`
    });    
}

module.exports = {
    sendMailToUser
}
