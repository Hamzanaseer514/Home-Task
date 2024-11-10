const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const JWT_SECRET = "lab9@Ecommercelab"

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required", success:false });
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long",success:false });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ msg: "User registered successfully", user, success: true });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message,success:false });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required",success:false });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Please login with the correct credentials", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Please login with the correct credentials", success: false });
        }

        const data = {
            id: user._id,
            role: user.role,
        };
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({ msg: "Login successful",token, name: user.name, success: true });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message,success:false });
    }
};

module.exports = { register, login };
