const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const auth = require('../../middleware/auth');
const profileController = require('../../controller/profile');

// @route   GET api/profile/me
// @desc    GET current users profile
// @access  Private
router.get('/me', auth, profileController.getProfile);

// @route   POST api/profile
// @desc    Create of update profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            body('status', 'Status is required').not().isEmpty(),
            body('skills', 'Skills is required').not().isEmpty(),
        ],
    ],
    profileController.postProfile
);

module.exports = router;
