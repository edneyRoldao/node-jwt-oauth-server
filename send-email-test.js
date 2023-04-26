const { sendMailToUser } = require('./services/email-service')

const code = 'ABC123'
const type = 'activation'
const message = 'mensagem de teste'
const subject = 'nao e que foi mesmo'
const email = 'edneyroldao@gmail.com'

sendMailToUser(email, code, subject, message, type)
