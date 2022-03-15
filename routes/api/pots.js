const express = require('express');

const router = express.Router();

// @route   GET api/pots
//  @desc   Test route
// @access  Public
router.get('/', (req, res) => res.send('pots route'));

module.exports = router;
