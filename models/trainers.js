const {Schema, model} = require('mongoose')

const schema = new Schema({
    avatar: {type: String, required: true},
    name: {type: String, required: true},
    profession: {type: String, required: true},
    description: {type: String, required: true},
})

module.exports = model('Trainers', schema)