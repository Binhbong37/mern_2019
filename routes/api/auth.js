const express = require('express');
const { check } = require('express-validator/check');

const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('../../controller/auth');
const userController = require('../../controller/users');

// @route   GET api/auth
//  @desc   Test route
// @access  Public
router.get('/', auth, authController.getUser);

// @route   POST api/auth
//  @desc   Authenticate User & get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'plz include a vailid email').isEmail(),
        check('password', 'password is requried').exists(),
    ],
    authController.postUser
);

module.exports = router;
