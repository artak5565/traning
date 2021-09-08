const {Schema, model} = require('mongoose')

const schema = new Schema({
    state: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    created: { type: Date, default: Date.now },
    viewed: { type: Boolean, default: false }
})

module.exports = model('Feedback', schema)