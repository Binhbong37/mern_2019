const express = require('express');

const router = express.Router();

const userController = require('../../controller/users');
const { check } = require('express-validator/check');

// @route   POST api/user
//  @desc   Test route
// @access  Public
router.post(
    '/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'plz include a vailid email').isEmail(),
        check(
            'password',
            'plz enter a password with 6 or more character'
        ).isLength({ min: 6 }),
    ],
    userController.postNewUser
);

module.exports = router;
