const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

userSchema.method('compare', async (formPass, userPass) => {
    return bcrypt.compare(formPass, userPass)
});

const User = mongoose.model("User", userSchema);

module.exports = User;