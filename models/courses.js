const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    icon: {type: String, required: true},
    description: {type: String, required: true},
    active: {type: Boolean},
})

module.exports = model('Courses', schema)
