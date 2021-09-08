const {validationResult} = require('express-validator')
const Learner = require('../models/learner')

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
        const learner = new Learner({ ...body })
        await learner.save()

        res.json({ message: 'registration completed successfully, our administrators will contact you' })
    } catch (error) {
        res.status(500).json({ message: 'Error: ' + error})
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { deleteItems } = req.body;
        await Learner.deleteMany({ _id: deleteItems });
        const learners = await Learner.find().sort({ created: -1 });
        res.json(learners)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.viewed = async (req, res) => {
    try{
        await Learner.findByIdAndUpdate(req.body.id, { viewed: true }, {useFindAndModify: false});
        const learners = await Learner.find().sort({ created: -1 });;
        res.json(learners)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.getLearners = async (req, res) => {
    try{
        const learners = await Learner.find().sort({ created: -1 })
        res.json(learners)
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}
