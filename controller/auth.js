const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require('config');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server Errors' });
    }
};

exports.postUser = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check if user not exists
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        // check match PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // return jsonToken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            }
        );
    } catch (error) {
        return res.status(500).send('Server Errors');
    }
};
