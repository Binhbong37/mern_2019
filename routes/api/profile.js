const express = require('express');
const { body } = require('express-validator/check');
const Profile = require('../../models/profile');
// const User = require('../models/users');

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

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
    '/experience',
    [
        auth,
        [
            body('title', 'Title is required').not().isEmpty(),
            body('company', 'Company is required').not().isEmpty(),
            body('from', 'From Date is required').not().isEmpty(),
        ],
    ],
    profileController.postAddExperience
);

// @route   DELETE api/profile/experience/expID
// @desc    DELETE experience from profile
// @access  Private
router.delete('/experience/:expId', auth, async (req, res) => {
    const expId = req.params.expId;
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience
            .map((item) => item._id)
            .indexOf(expId);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
    '/education',
    [
        auth,
        [
            body('school', 'School is required').not().isEmpty(),
            body('degree', 'Degree is required').not().isEmpty(),
            body('fieldofstudy', 'Field of study is required').not().isEmpty(),
            body('from', 'From Date is required').not().isEmpty(),
        ],
    ],
    profileController.postAddEducation
);

// @route   DELETE api/profile/education/eduId
// @desc    DELETE education from profile
// @access  Private
router.delete('/education/:eduId', auth, profileController.deleteEdu);

module.exports = router;
