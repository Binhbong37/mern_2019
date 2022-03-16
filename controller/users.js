const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');

exports.postNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }
        // GET user gravatar ( tạo 1 cái ảnh fake )
        // Create user to db
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });

        user = new User({
            name,
            email,
            password,
            avatar,
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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
        console.log(req.body);
    } catch (error) {
        return res.status(500).send('Server Errors');
    }
};
