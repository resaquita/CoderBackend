const firebaseConfig = require('./firebase/firebase.config.json');
const envConfig = require('../utils/config')

module.exports = {
    mongodb: {
        uri: `mongodb+srv://coderManu:${envConfig.DB_PASSWORD}@cluster0.0soyke4.mongodb.net/?retryWrites=true&w=majority` 
    },
    firebase: {
        credentials: firebaseConfig
    },
}
