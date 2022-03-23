const Profile = require('../models/profile');
const User = require('../models/users');
const Post = require('../models/post');
const { validationResult } = require('express-validator/check');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );
        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Errors');
    }
};

// @route   POST api/profile
// @desc    Create AND update profile
// @access  Private
exports.postProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        skills,
        githubusername,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin,
    } = req.body;

    // build profile obj
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    // Build social obj
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
};

// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
exports.getprofiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar',
        ]);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
};

// @route   GET api/profile/user/:user_id
// @desc    GET all profiles by user ID
// @access  Public
exports.getprofileByUser = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const profile = await Profile.findOne({ user: user_id }).populate(
            'user',
            ['name', 'avatar']
        );
        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        if (error.kind == 'ObjectId') {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }
        res.status(500).json('Sever Error');
    }
};

// @route   DELETE api/profile
// @desc    Delete profile, user and pots
// @access  Private
exports.postDeleteProfile = async (req, res) => {
    try {
        // remove user post
        await Post.deleteMany({ user: req.user.id });
        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
};

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
exports.postAddExperience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
        req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
};

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
exports.postAddEducation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
};

exports.deleteEdu = async (req, res) => {
    const eduId = req.params.eduId;
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education
            .map((item) => item._id)
            .indexOf(eduId);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Sever Error');
    }
};
