const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid login data'
            })
        }
        const {username, password} = req.body
        const admin = await Admin.findOne({ username })
        if(!admin) {
            return res.status(400).json({ message: 'Invalid email or password.'})
        }
        const isMatch = await bcryptjs.compare(password, admin.password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password'})
        }
        const token = jwt.sign(
            { id: admin.id },
            config.get('jwtSecret'),
            { expiresIn: "2 days" }
        )
        res.json({ token: `Bearer ${token}` })
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }
        const {user} = req
        const {current, new: newPass, confirm} = req.body
        const isMatch = await bcryptjs.compare(current, user.password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid current password'})
        }
        if(newPass !== confirm) {
            return res.status(400).json({ message: 'Invalid confirm password'})
        }
        const hashedPassword = await bcryptjs.hash(newPass, 12)
        await Admin.findByIdAndUpdate(user.id, {password: hashedPassword}, {useFindAndModify: false})
        res.end()
    } catch (error) {
        res.status(500).json({message: 'Error: ' + error})
    }
}

module.exports.checkToken = async (req, res) => {
    res.end()
}