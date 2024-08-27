const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(409).json({ msg: "Username already exists" })
        }
        const hashPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashPwd });
        await newUser.save();
        return res.status(201).json({ msg: 'User reigstered' });
    } catch (error) {
        console.log(' err => ', error)
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: existingUser.username }, 'e4618f9d836644043dc1363344b962a1f9e85bf9d38263a47ff0a86ce6a2e203', { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


exports.updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername } = req.body;
        // Update the user's username
        await User.updateOne({ username }, { username: newUsername });
        return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};