const Profile = require('../models/profile');
const User = require('../models/users');

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
