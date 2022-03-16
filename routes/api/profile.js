const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const profileController = require('../../controller/profile');

// @route   GET api/profile/me
//  @desc   GET current users profile
// @access  Private
router.get('/me', auth, profileController.getProfile);

module.exports = router;
