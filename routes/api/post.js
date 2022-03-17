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

// @route   PUT api/posts/like/:Id (id = postId)
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    const likeId = req.params.id;
    try {
        const post = await Post.findById(likeId);

        // check if the post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Errors');
    }
});

// @route   PUT api/posts/unLike/:Id (id = postId)
// @desc    Like a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    const unlikeId = req.params.id;
    try {
        const post = await Post.findById(unlikeId);

        // check if the post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Errors');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
    '/comment/:id',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newPost = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };
            post.comments.unshift(newPost);
            await post.save();
            res.json(post);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Errors');
        }
    }
);

// @route   DELETE api/posts/comment/:id/:commentId
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:commentId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // id này là của post

        // Pull out comment
        // Lấy ra comment cần xóa
        const comment = post.comments.find(
            (com) => com.id === req.params.commentId
        );

        // Check if comment exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment is not exists' });
        }

        // check User
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });
        }

        // Get remove index
        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Errors');
    }
});
module.exports = router;
