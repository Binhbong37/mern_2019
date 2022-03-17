const express = require('express');

const router = express.Router();

const Post = require('../../models/post');
const User = require('../../models/users');
const Profile = require('../../models/profile');
const { validationResult, check } = require('express-validator/check');
const auth = require('../../middleware/auth');

// @route   POST api/posts
// @desc    Create a post
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

// @route   GET api/posts
// @desc    GET all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Errors');
    }
});

// @route   GET api/posts/:postId
// @desc    GET post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'post not found!' });
        }

        res.json(post);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found!' });
        }
        res.status(500).send('Server Errors');
    }
});

// @route   DELETE api/posts/:Id
// @desc    DELETE post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'post not found!' });
        }
        if (post.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();

        res.json({ msg: 'Post is removed' });
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found!' });
        }
        res.status(500).send('Server Errors');
    }
});

module.exports = router;
