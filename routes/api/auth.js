const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('../../controller/auth');

// @route   GET api/auth
//  @desc   Test route
// @access  Public
router.get('/', auth, authController.getUser);

module.exports = router;
