const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongooseURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Mongoose conneted . . .');
    } catch (error) {
        console.log(error.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
