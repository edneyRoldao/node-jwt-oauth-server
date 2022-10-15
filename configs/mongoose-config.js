const mongoose = require('mongoose');
const appEnv = require('./env-config')()

const connect = () => {
    mongoose.connect(appEnv.mongoConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    })
}

module.exports = {
    connect
}
