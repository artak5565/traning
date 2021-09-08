const {validationResult} = require('express-validator')
const Feedback = require('../models/feedback')

module.exports.add = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Fill in required fields'
            })
        }

        const { body } = req
        const feedback = new Feedback({ ...body })
        await feedback.save()

        res.json({ message: 'We have received your message, our administrators will contact you' })
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error})
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { deleteItems } = req.body;
        await Feedback.deleteMany({ _id: deleteItems });
        const feedback = await Feedback.find().sort({ created: -1 });
        res.json(feedback)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.viewed = async (req, res) => {
    try{
        await Feedback.findByIdAndUpdate(req.body.id, { viewed: true }, {useFindAndModify: false});
        const feedback = await Feedback.find().sort({ created: -1 });;
        res.json(feedback)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.getFeedbacks = async (req, res) => {
    try{
        const feedback = await Feedback.find().sort({ created: -1 });;
        res.json(feedback)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}
