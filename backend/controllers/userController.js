import User from '../models/userModel.js';  // Import the User model
import bcrypt from 'bcryptjs';              // For password hashing
import jwt from 'jsonwebtoken';             // For token creation
import validator from 'validator';

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',  // Adjust expiration time as per your requirement
    });
};

// User login handler
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = createToken(user._id);

        // Respond with the token and userId
        res.status(200).json({ success: true, token, userId: user._id });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// User registration handler
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }

        // Check password length (minimum 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        // Check password maximum length (max 20 characters)
        if (password.length > 20) {
            return res.status(400).json({ success: false, message: 'Password cannot exceed 20 characters' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user
        await user.save();

        // Generate a JWT token using the common createToken function
        const token = createToken(user._id);

        // Respond with the token and userId
        res.status(201).json({ success: true, token, userId: user._id });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin login handler
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Here you may implement your logic to validate admin credentials
        const admin = await User.findOne({ email, role: 'admin' }); // Assuming you have a role field
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token for admin
        const token = createToken(admin._id);

        // Respond with the token and userId
        res.status(200).json({ success: true, token, userId: admin._id });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { loginUser, registerUser, adminLogin };

