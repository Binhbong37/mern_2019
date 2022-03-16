const User = require('../models/users');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server Errors' });
    }
};
