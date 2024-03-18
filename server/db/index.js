const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.uoxbe.mongodb.net/wine-shop?retryWrites=true&w=majority')
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db