const Courses = require('../models/courses')
const fs = require('fs')

module.exports.add = async (req, res) => {
    try {
        const { name, description } = req.body
        const { filename } = req.file
        const icon = `/${filename}`;
        const course = new Courses({ icon, name, description })
        await course.save()
        const courses = await Courses.find()
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: error.toString()})
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { deleteItems } = req.body
        const odlCourses = await Courses.find().where('_id').in(deleteItems)
        odlCourses.forEach(el => fs.unlinkSync(`./public${el.icon}`))
        await Courses.deleteMany({ _id: deleteItems })
        const courses = await Courses.find()
        res.json(courses)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}

module.exports.edit = async (req, res) => {
    const { name, description } = req.body
    const { filename } = req.file
    const icon = `/${filename}`
    const { icon: oldIcon } = await Courses.findById(req.body.id)
    fs.unlinkSync(`./public${oldIcon}`)
    try{
        await Trainers.findByIdAndUpdate(
            req.body.id,
            { icon, name, description },
            {useFindAndModify: false}
        )
        const courses = await Courses.find()
        res.json(courses)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}

module.exports.getCourses = async (req, res) => {
    try{
        const courses = await Courses.find();
        res.json(courses)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}
