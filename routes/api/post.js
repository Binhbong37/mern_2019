const express = require('express');

const router = express.Router();

const Post = require('../../models/post');
const User = require('../../models/users');
const Profile = require('../../models/profile');
const { validationResult, check } = require('express-validator/check');
const auth = require('../../middleware/auth');

// @route   POST api/pots
//  @desc   Create a post
// @access  Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });
            const post = await newPost.save();
            res.json(post);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Errors');
        }
    }
);

module.exports = router;
