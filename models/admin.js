const {Schema, model} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
})

module.exports = model('Admin', schema)