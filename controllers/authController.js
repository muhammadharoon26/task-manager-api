const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({ message: 'User registered' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, pasword } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}