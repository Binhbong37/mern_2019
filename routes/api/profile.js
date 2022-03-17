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
// @desc    Create AND update profile
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

// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
router.get('/', profileController.getprofiles);

// @route   GET api/profile/user/:user_id
// @desc    GET all profiles by user ID
// @access  Public
router.get('/user/:user_id', profileController.getprofileByUser);

// @route   DELETE api/profile
// @desc    Delete profile, user and pots
// @access  Private
router.delete('/', auth, profileController.postDeleteProfile);

module.exports = router;
