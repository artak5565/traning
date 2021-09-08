const Trainers = require('../models/trainers')
const fs = require('fs')

module.exports.add = async (req, res) => {
    try {
        const { name, profession, description } = req.body
        const { filename } = req.file
        const avatar = `/trainers/${filename}`;
        const trainer = new Trainers({ avatar, name, profession, description })
        await trainer.save()
        const trainers = await Trainers.find()
        res.json(trainers)
    } catch (error) {
        res.status(500).json({ message: error.toString()})
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { deleteItems } = req.body
        const odlTrainers = await Trainers.find().where('_id').in(deleteItems)
        odlTrainers.forEach(el => fs.unlinkSync(`./public${el.avatar}`))
        await Trainers.deleteMany({ _id: deleteItems })
        const trainers = await Trainers.find()
        res.json(trainers)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}

module.exports.edit = async (req, res) => {
    const { name, profession, description } = req.body
    const { filename } = req.file
    const avatar = `/trainers/${filename}`
    const { avatar: oldAvatar } = await Trainers.findById(req.body.id)
    fs.unlinkSync(`./public${oldAvatar}`)
    try{
        await Trainers.findByIdAndUpdate(
            req.body.id,
            { avatar, name, profession, description },
            {useFindAndModify: false}
        )
        const trainers = await Trainers.find()
        res.json(trainers)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}

module.exports.getTrainers = async (req, res) => {
    try{
        const trainers = await Trainers.find()
        res.json(trainers)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}
