const {Schema, model} = require('mongoose')

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    course: {type: String}, 
    created: { type: Date, default: Date.now },
    viewed: { type: Boolean, default: false }
})

module.exports = model('Learner', schema)